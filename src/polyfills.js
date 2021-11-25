if (!Array.prototype.flat) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.flat = function (depth) {
    var flattend = []
    ;(function flat(array, depth) {
      for (let el of array) {
        if (Array.isArray(el) && depth > 0) {
          flat(el, depth - 1)
        } else {
          flattend.push(el)
        }
      }
    })(this, Math.floor(depth) || 1)
    return flattend
  }
}
