import * as _ from 'ramda'
import { inspect, print } from './utils'

/**
 * `Maybe` looks like `Functor` with one minor change: it will first check to see if it has a value before calling the supplied function.
 */
class Maybe {
  $value: any

  static of (x) {
    return new Maybe(x)
  }

  get isNothing () {
    return this.$value === null || this.$value === undefined
  }

  constructor (x) {
    this.$value = x
  }

  map (fn: (value) => any) {
    return this.isNothing ? this : Maybe.of(fn(this.$value))
  }

  inspect () {
    return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`
  }
}

const age1 = Maybe.of({ name: 'Boris' }).map(_.prop('age')).map(_.add(10)).inspect()
const age2 = Maybe.of({ name: 'Boris', age: 25 }).map(_.prop('age')).map(_.add(10)).inspect()

// print results
print(age1, age2)
