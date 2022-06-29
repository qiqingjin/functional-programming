import * as _ from 'ramda'
import { inspect, print } from './utils'

/**
 * `Left` and `Right` are two subclasses of an abstract type we call `Either`.
 * `Left` ignores our request to map over it.
 * `Right` will work just like `Functor`.
 */
class Either {
  $value: any

  static of (x) {
    return new Either(x)
  }

  constructor (x) {
    this.$value = x
  }
}

class Left extends Either {
  static of (x) {
    return new Left(x)
  }

  map (fn: (x) => any) {
    return this
  }

  inspect () {
    return `Left(${inspect(this.$value)})`
  }
}

class Right extends Either {
  static of (x) {
    return new Right(x)
  }

  map (fn: (x) => any) {
    return Either.of(fn(this.$value))
  }

  inspect() {
    return `Right(${inspect(this.$value)})`
  }
}

const getAge = _.curry((now: number, user: { birthDate: number }) => {
  const b = _.prop('birthDate', user)
  return b <= now && b > 0 ? Right.of(Math.floor((now - b) / (1000 * 60 * 60 * 24 * 365))) : Left.of('Birth date could not be parsed')
})
const getAgeIn2022 = getAge(new Date('2022').getTime())
const employees = [{ name: 'Bob', birthDate: 725846400000 }, { name: 'Alice', birthDate: -1 }]
const ages = _.map(getAgeIn2022, employees)

print(ages)
