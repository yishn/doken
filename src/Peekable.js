class Peekable {
  constructor(iterator) {
    this[Symbol.iterator] = () => iterator
    this._peekedItem = undefined
    this._peeked = false
  }

  next() {
    let next = this._peeked ? this._peekedItem : this[Symbol.iterator]().next()

    this._peekedItem = undefined
    this._peeked = false

    return next
  }

  peek() {
    if (!this._peeked) {
      this._peekedItem = this[Symbol.iterator]().next()
      this._peeked = true
    }

    return this._peekedItem
  }
}

module.exports = Peekable
