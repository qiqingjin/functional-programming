import * as _ from 'ramda'
import { inspect, print, chainMonad } from './utils'

/**
 * A `Pointed functor` is a functor with an `of` method. `Monad` is pointed functors that can flatten.
 * Any functor which defines a `join` method, has an `of` method, and obeys a few laws is a monad.
 */
class Monad {
  $value: any

  static of (x) {
    return new Monad(x)
  }

  constructor (x) {
    this.$value = x
  }

  map (fn: (x) => any) {
    return Monad.of(fn(this.$value))
  }

  join () {
    return this.$value
  }

  chain (fn: (x) => any) {
    return this.map(fn).join()
  }

  inspect () {
    return `Just(${inspect(this.$value)})`
  }
}

const prop = _.curry((x, obj) => Monad.of(obj[x]))
const head = prop(0)
const findRootFolder = _.compose(chainMonad(head), prop('path'))
const rootFolder = findRootFolder({ name: 'package.json', path: ['Users', 'yuey9507', 'Repos', 'functional-programming'] })

print(rootFolder)
