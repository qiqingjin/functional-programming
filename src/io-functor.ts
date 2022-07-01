import * as _ from 'ramda'
import { inspect, mapIO, print } from './utils'
import * as fs from 'fs'

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

// io - 1
const ioFileName = new IO(() => __filename)
const toFolderArray = _.compose(_.filter(ele => !!ele), _.split('/'))
const inFolder = (f: string) => ioFileName.map(_.compose(_.equals(f), _.head, toFolderArray))
// impure code, run the IO by calling $value()
const inUsersFolder = inFolder('Users').$value()

// io - 2
const readFile = filename => new IO(() => fs.readFileSync(filename, 'utf-8'))
const log = x => new IO(() => {
  console.log(x)
  return x
})
const cat = _.compose(mapIO(log), readFile)
const catPackageJson = cat('package.json') as unknown as IO
const packageJson = catPackageJson.$value().$value()

print(packageJson)
