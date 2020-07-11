export type Tag = string
export type Seq = Tag[]

function union(a: Seq, b?: Seq): Seq {
  if (typeof b === 'undefined') return a

  const c: Seq = []
  b.forEach((v) => {
    if (a.includes(v)) {
      c.push(v)
    }
  })
  return c.sort()
}

function remove(ary: Seq, v: Tag) {
  const i = ary.indexOf(v)
  if (i >= 0) {
    ary.splice(i, 1)
  }
  return ary
}

export function clean(order: Record<Tag, Seq>) {
  const newOrder: Record<Tag, Seq> = {}
  for (let key in order) {
    const after = order[key]

    // remove all the items that they are indirectly before key.
    const direct = [...after]
    after.forEach(function (k) {
      order[k].forEach((v) => {
        remove(direct, v)
      })
    })
    newOrder[key] = direct
  }
  return newOrder
}

export function infer(examples: Seq[], doClean = false) {
  const order: Record<Tag, Seq> = {}
  examples.forEach((seq) => {
    const seen: Seq = []
    seq.forEach((value: Tag) => {
      order[value] = union([...seen], order[value])
      seen.push(value)
    })
  })

  if (doClean) {
    return clean(order)
  }

  return order
}
