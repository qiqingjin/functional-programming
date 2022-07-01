class Identity {
  $value: any

  constructor (x) {
    this.$value = x
  }

  static of (x) {
    return new Identity(x)
  }

  map (fn: (x) => any) {
    return Identity.of(fn(this.$value))
  }
}
