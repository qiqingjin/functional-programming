import { print } from './utils'

/**
 * A `Functor` is a type that implements `map` and obeys some laws.
 * A `Pointed functor` is an object with an `of` function that puts any single value into it.
 * The following functor is actually `Poinetd functor`.
 */
class Functor {
  $value: any

  static of (x) {
    return new Functor(x)
  }

  constructor (x) {
    this.$value = x
  }

  map (fn: (x) => any) {
    return Functor.of(fn(this.$value))
  }
}

const boubledTwo = Functor.of(2).map(v => v * 2)

print(boubledTwo)
