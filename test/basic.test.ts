import { infer, clean } from '../src'

const A = 'A'
const B = 'B'
const C = 'C'
const D = 'D'
const E = 'E'
const F = 'F'

describe('basic', () => {
  it('trivial', () => {
    const partial = infer([
      [A, B, C],
      [B, A, C],
    ])
    expect(partial).toEqual({ A: [], B: [], C: [A, B] })
  })

  it('2 level', () => {
    const sequences = [
      [A, B, C, D, E],
      [B, A, D, C, E],
      [A, B, C, D, E],
    ]
    const partial = infer(sequences)
    expect(partial).toEqual({ A: [], B: [], C: [A, B], D: [A, B], E: [A, B, C, D] })
    expect(clean(partial)).toEqual({ A: [], B: [], C: [A, B], D: [A, B], E: [C, D] })
    expect(infer(sequences, true)).toEqual({ A: [], B: [], C: [A, B], D: [A, B], E: [C, D] })
  })
})
