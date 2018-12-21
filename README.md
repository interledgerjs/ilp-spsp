# ILP SPSP
> Command-line tool for sending spsp payments over ILP

## Quick-start

Make sure you're running a local ILP provider. If you don't have one, take a look at [moneyd](https://github.com/sharafian/moneyd) or read the getting started guide on [interledger.org](https://interledger.org).

```sh
npm install -g ilp-spsp
# payment pointers use the '$' so must be escaped in bash
ilp-spsp --help
# --> 
# ilp-spsp [command]

# Commands:
#   ilp-spsp send     send money via SPSP
#   ilp-spsp invoice  pay an SPSP invoice
#   ilp-spsp pull     pull money via SPSP
#   ilp-spsp query    query SPSP endpoint

# Options:
#   --help         Show help                                             [boolean]
#   --version      Show version number                                   [boolean]
#   --pointer, -p  SPSP payment pointer

ilp-spsp query --pointer '$mysubdomain.localtunnel.me'
# --> 
# {
#   "destinationAccount": "g.siren.out.XOj2Y_doFnoFDZTp0sKKvUOfw7XFpW9OyWyz7gkxQhE.FOiDpSe0xmo.UpGrSQGr7TvDmnLUoEez0Gzg",
#   "sharedSecret": "qtUsvKOjVX9b6WIZT5KVTJhXnkej0P5kH6vAoRm9atU=",
#   "ledgerInfo": {
#     "asset_code": "XRP",
#     "asset_scale": 6
#   },
#   "receiverInfo": {
#     "name": "Test Person"
#   }
# }

ilp-spsp query --pointer '$mysubdomain.localtunnel.me/f8095a44-c77f-4414-a19d-7aeca03f17c7'
# --> 
# {
#   "destinationAccount": "private.moneyd.local.PacgxNqHIKTlZGM3aB_2YrXQydNPASI_j8LyE4BFmnc.uNiOoTJbbJrcqb2aHO9Kh51W~f8095a44-c77f-4414-a19d-7aeca03f17c7",
#   "sharedSecret": "b88NPGVk5nubgM6zpnI/tVjRdgpUh+JvMueRFEMvPcY=",
#   "balance": {
#     "amount": "100",
#     "current": "100",
#     "maximum": "10000"
#   },
#   "receiverInfo": {
#     "name": "Amazon",
#     "interval": "7",
#     "cooldown": "1546037535"
#   },
#   "contentType": "application/spsp4+json"
# }

ilp-spsp send --pointer '$mysubdomain.localtunnel.me' --amount 1000
# --> 
# paying 100 to "$mysubdomain.localtunnel.me"...
# sent!

ilp-spsp pull --pointer '$mysubdomain.localtunnel.me/f8095a44-c77f-4414-a19d-7aeca03f17c7'
# --> 
# Pulled packet for 100 units from $mysubdomain.localtunnel.me/f8095a44-c77f-4414-a19d-7aeca03f17c7  //amount depends on the specification in the pull payment pointer
# or --> 
# Cooldown period is not over.
# or --> 
# Maximum pull amount is reached.
```
