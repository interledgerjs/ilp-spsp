# ILP SPSP
> Command-line tool for sending spsp payments over ILP

## Quick-start

Make sure you're running a local ILP provider. If you don't have one, take a look at [moneyd](https://github.com/sharafian/moneyd) or read the getting started guide on [interledger.org](https://interledger.org).

```sh
npm install -g ilp-spsp
# payment pointers use the '$' so must be escaped in bash
ilp-spsp --help
ilp-spsp send --receiver \$sharafian.com --amount 1000
ilp-spsp query --receiver \$sharafian.com
# --> {
#   "destinationAccount": "g.siren.out.XOj2Y_doFnoFDZTp0sKKvUOfw7XFpW9OyWyz7gkxQhE.FOiDpSe0xmo.UpGrSQGr7TvDmnLUoEez0Gzg",
#   "sharedSecret": "qtUsvKOjVX9b6WIZT5KVTJhXnkej0P5kH6vAoRm9atU=",
#   "ledgerInfo": {
#     "asset_code": "XRP",
#     "asset_scale": 6
#   },
#   "receiverInfo": {
#     "name": "Ben Sharafian"
#   }
# }
```
