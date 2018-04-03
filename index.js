#!/usr/bin/env node
const plugin = require('ilp-plugin')()
const SPSP = require('ilp-protocol-spsp')
const STREAM = require('ilp-protocol-stream')
const debug = require('debug')('ilp-spsp')

require('yargs')
  .option('receiver', {
    alias: 'r',
    description: 'payment pointer of SPSP receiver'
  })
  .command('send', 'send money via SPSP', {
    amount: {
      alias: 'a',
      required: false,
      description: 'amount to send to receiver (source account base units)'
    }
  }, async argv => {
    if (argv.amount) {
      console.log(`paying (maximum of) ${argv.amount} to "${argv.receiver}"...`)
    }

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
  .command('query', 'query SPSP endpoint', {}, async argv => {
    const response = await SPSP.query(argv.receiver)
    response.sharedSecret = response.sharedSecret.toString('base64')
    console.log(JSON.stringify(response, null, 2))
    process.exit(0)
  })
  .argv
