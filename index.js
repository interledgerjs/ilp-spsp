#!/usr/bin/env node
const plugin = require('ilp-plugin')()
const SPSP = require('ilp-protocol-spsp')
const PSK2 = require('ilp-protocol-psk2')
const debug = require('debug')('ilp-spsp')

require('yargs')
  .option('receiver', {
    alias: 'r',
    description: 'payment pointer of SPSP receiver'
  })
  .command('send', 'send money via SPSP', {
    amount: {
      alias: 'a',
      required: true,
      description: 'amount to send to receiver (source account base units)'
    }
  }, async argv => {
    console.log(`paying ${argv.amount} to "${argv.receiver}"...`)

    try {
      debug('connecting plugin')
      await plugin.connect()
      debug('sending payment')
      await SPSP.pay(plugin, {
        receiver: argv.receiver,
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
    console.log(`paying invoice at "${argv.receiver}"...`)

    try {
      debug('connecting plugin')
      await plugin.connect()

      debug('querying SPSP receiver')
      const query = await SPSP.query(argv.receiver)

      if (!query.balance) {
        console.error('query result has no balance')
        process.exit(1)
      }

      debug('paying invoice')
      await PSK2.sendDestinationAmount(plugin, {
        ...query,
        destinationAmount: query.balance.maximum
      })

      console.log('paid!')
      process.exit(0)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })
  .command('query', 'query SPSP endpoint', {}, async argv => {
    const response = await SPSP.query(argv.receiver)
    response.sharedSecret = response.sharedSecret.toString('base64')
    console.log(JSON.stringify(response, null, 2))
    process.exit(0)
  })
  .argv
