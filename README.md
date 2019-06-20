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
#   --help                         Show help                                             [boolean]
#   --version                      Show version number                                   [boolean]
#   --pointer, --receiver, -p, -r  SPSP payment pointer

ilp-spsp query --pointer '$mysubdomain.localtunnel.me'
# --> 
# {
#   "destinationAccount": "private.moneyd.local.DMMyURutr6hUmF-Go0ch3SAnsvrKKnmqG6oWwtEDjTA.cFKMLZPFaXJCL_pqqjLtLWPE~ccf42f59-5692-4a8b-8fde-4896c7601035",
#   "sharedSecret": "qtUsvKOjVX9b6WIZT5KVTJhXnkej0P5kH6vAoRm9atU=",

ilp-spsp send --pointer '$mysubdomain.localtunnel.me' --amount 1000
# --> 
# paying 1000 to "$mysubdomain.localtunnel.me"...
# sent 1000 units!

ilp-spsp pull --pointer '$mysubdomain.localtunnel.me/f8095a44-c77f-4414-a19d-7aeca03f17c7' --amount 100
# --> 
# pulled 100 units! 
```
