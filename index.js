#!/usr/bin/env node
const plugin = require('ilp-plugin')()
const SPSP = require('ilp-protocol-spsp')
const PSK2 = require('ilp-protocol-psk2')
const debug = require('debug')('ilp-spsp')

require('yargs')
  .option('pointer', {
    alias: ['receiver', 'p', 'r'],
    description: 'SPSP payment pointer'
  })
  .command('send', 'send money via SPSP', {
    amount: {
      alias: 'a',
      required: true,
      description: 'amount to send to payment pointer (source account base units)'
    }
  }, async argv => {
    console.log(`paying ${argv.amount} to "${argv.pointer}"...`)

    try {
      debug('connecting plugin')
      await plugin.connect()
      debug('sending payment')
      await SPSP.pay(plugin, {
        pointer: argv.pointer,
        sourceAmount: argv.amount
      })
    } catch (e) {
      console.error(e)
      process.exit(1)
    }

    console.log('sent!')
    process.exit(0)
  })
  .command('invoice', 'pay an SPSP invoice', {}, async argv => {
    console.log(`paying invoice at "${argv.pointer}"...`)

    try {
      debug('connecting plugin')
      await plugin.connect()

      debug('querying SPSP payment pointer')
      const query = await SPSP.query(argv.pointer)

      if (!query.balance) {
        console.error('query result has no balance')
        process.exit(1)
      }

      if (query.contentType.indexOf('application/spsp+json') === -1) {
        console.error('use the \'send\' command to fill an invoice on SPSPv4.')
        process.exit(1)
      }

      debug('paying invoice')
      await PSK2.sendDestinationAmount(plugin, {
        ...query,
        destinationAmount: String(query.balance.maximum - query.balance.current)
      })

      console.log('paid!')
      process.exit(0)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })
  .command('pull', 'pull money via SPSP', {
    amount: {
      alias: 'a',
      required: true,
      description: 'amount to pull from payment pointer (receiving account base units)'
    }
  }, async argv => {
    console.log(`pulling from "${argv.pointer}"...`)
    try {
      debug('connecting plugin')
      await plugin.connect()
      debug('pulling payment')
      try {
        const pulledAmount = await SPSP.pull(plugin, {
          pointer: argv.pointer,
          amount: argv.amount,
          streamOpts: { timeout: 10000 }
        }).totalReceived
        console.log('pulled ' + pulledAmount + ' units!')
      } catch (e) {
        console.log('pulled ' + (e instanceof SPSP.SPSPPaymentError ? e.totalReceived : '0') + ' units!')
      }
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
    process.exit(0)
  })
  .command('query', 'query SPSP endpoint', {}, async argv => {
    const response = await SPSP.query(argv.pointer)
    response.sharedSecret = response.sharedSecret.toString('base64')
    console.log(JSON.stringify(response, null, 2))
    process.exit(0)
  })
  .argv
