import * as _ from 'ramda'
import { inspect, print } from './utils'

/**
 * `IO` differs from the previous functors in that the $value is always a function.
 * `IO` delays the impure action by capturing it in a function wrapper.
 * Calling `io.$value()` is impure, leave it to the caller.
 */
class IO {
  $value: () => any

  static of (x) {
    return new IO(() => x)
  }

  constructor (fn: () => any) {
    this.$value = fn
  }

  map (fn: (x) => any) {
    return new IO(_.compose(fn, this.$value))
  }

  inspect () {
    return `IO(${inspect(this.$value)})`
  }
}

const ioFileName = new IO(() => __filename)
const toFolderArray = _.compose(_.filter(ele => !!ele), _.split('/'))
const inFolder = (f: string) => ioFileName.map(_.compose(_.equals(f), _.head, toFolderArray))
// impure code, run the IO by calling $value()
const inUsersFolder = inFolder('Users').$value()

print(inUsersFolder)
