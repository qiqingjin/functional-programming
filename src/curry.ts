import * as _ from 'ramda'
import { print } from './utils'

// curry - 1
const splitWords = _.map(_.split(''))
const splitted = splitWords(['hello', 'world'])

// curry - 2
const filterQ = _.filter(x => /q/i.test(x as string))
const filtered = filterQ(['Mr.Q', 'Mr.M'])

// curry - 3
const larger = (x, y) => x >= y ? x : y
const max = _.reduce((acc, ele) => larger(acc, ele), -Infinity)
const heighest = max([1, 2, 5, 3])

// print results
print(splitted, filtered, heighest)
