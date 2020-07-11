# @jacobbubu/infer-partial-order

[![Build Status](https://github.com/jacobbubu/infer-partial-order/workflows/Build%20and%20Release/badge.svg)](https://github.com/jacobbubu/infer-partial-order/actions?query=workflow%3A%22Build+and+Release%22)
[![Coverage Status](https://coveralls.io/repos/github/jacobbubu/infer-partial-order/badge.svg)](https://coveralls.io/github/jacobbubu/infer-partial-order)
[![npm](https://img.shields.io/npm/v/@jacobbubu/infer-partial-order.svg)](https://www.npmjs.com/package/@jacobbubu/infer-partial-order/)

> Rewrite [infer-partial-order](https://github.com/dominictarr/infer-partial-order) with TypeScript

# Why rewrite

* Rewriting makes me more aware of the author’s intentions
* Adding a type declaration to the original module will not save much

In order to understand of the function of the module, the following is the original README copied.

# infer-partial-order

infer the partial order of a set from a set of examples.

say we have two sequences `A, B, C` and `B, A, C`.
Here `A < C` and `B < C`, but sometimes `B == A`.
This relationship is obvious, because there are only 3 items,
but as the number of items increase, it's much less clear.

## Example

represent a partial ordering like this:
``` ts
import { infer } from '@jacobbubu/infer-partial-order'

infer([ [A, B, C], [B, A, C] ])

=> {
  A:[],
  B:[],
  C:[A, B]
}
```

Each key maps to the list of items that always come before it.

for more complex cases, you might want to use the canonical mode,
it strips out items that are indirectly lesser than a given item.
This is still enough information to build a graph of the order
relationships.
``` js
var infer = require('infer-partial-order')

infer([ [A, B, C, D, E], [B, A, D, C, E], [A, B, C, D, E])

=> {
  A:[],
  B:[],
  C:[A, B],
  D:[A, B],
  E:[C, D]
}
```

## License

MIT
