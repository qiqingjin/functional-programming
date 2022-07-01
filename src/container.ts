import { print } from './utils'

/**
 * `Container` -
 * 1. only has one value
 * 2. value can be any type
 * 3. we can get value by `.$value`, but we won't do it most times
 */
class Container {
  $value: any

  static of (x) {
    return new Container(x)
  }

  constructor (x) {
    this.$value = x
  }
}

const two = Container.of(2)

print(two)
