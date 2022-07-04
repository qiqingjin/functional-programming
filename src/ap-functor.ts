import * as _ from 'ramda'
import { print } from './utils'

/**
 * An `Applicative` functor is a pointed functor with an `ap` method.
 * `Applicative` can run things concurrently.
 * F.of(x).map(f) == F.of(f).ap(F.of(x))
 */
class Ap {
  $value: any

  constructor (x) {
    this.$value = x
  }

  static of (x) {
    return new Ap(x)
  }

  map (fn: (x) => any) {
    return Ap.of(fn(this.$value))
  }

  ap (f: _.Functor<any>) {
    return f.map(this.$value)
  }
}

// ap - 1
const employeeName = Ap.of(_.prop).ap(Ap.of('name')).ap(Ap.of({ name: 'Bob' }))

// ap - 2, lift - at the time of calling, a function can be surrounded by `map`, which transforms it from a non-functory function to a functory one, we call this process lifting.
const liftA2 = _.curry((g: typeof _.curry<(x, y) => any>, f1: _.Functor<any>, f2: _.Functor<any>) => f1.map(g).ap(f2))
const managerName = liftA2(_.prop as any, Ap.of('name'), Ap.of({ name: 'Peter' }))

print(employeeName, managerName)
