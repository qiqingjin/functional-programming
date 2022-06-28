import * as _ from 'ramda'
import { print } from './utils'

// compose
const cars = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: false },
  { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: true }
]
const lastCarInStock = _.compose(_.prop('in_stock'), _.last)(cars)
const firstCarName = _.compose(_.prop('name'), _.head)(cars)

// print results
print(lastCarInStock, firstCarName)
