import { print } from './utils'

/**
 * A `Functor` is a type that implements `map` and obeys some laws.
 */
 class Functor {
  $value: any

  static of (x) {
    return new Functor(x)
  }

  constructor (x) {
    this.$value = x
  }

  map (fn: (value) => any) {
    return Functor.of(fn(this.$value))
  }
}

const boubledTwo = Functor.of(2).map(v => v * 2)

// print results
print(boubledTwo)
