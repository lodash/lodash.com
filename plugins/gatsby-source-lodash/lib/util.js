"use strict"

const _ = require("lodash")
const doctrine = require("doctrine")

const reCode = /`.*?`/g
const reToken = /@@token@@/g
const split = String.prototype.split
const token = "@@token@@"

/*----------------------------------------------------------------------------*/

/**
 * The `Array#sort` comparator to produce a
 * [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order).
 *
 * @memberOf util
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareNatural(value, other) {
  let index = -1
  const valParts = split.call(value, ".")
  const valLength = valParts.length
  const othParts = split.call(other, ".")
  const othLength = othParts.length
  const length = Math.min(valLength, othLength)

  while (++index < length) {
    const valPart = valParts[index]
    const othPart = othParts[index]

    if (valPart > othPart && othPart !== "prototype") {
      return 1
    } else if (valPart < othPart && valPart !== "prototype") {
      return -1
    }
  }
  return valLength > othLength ? 1 : valLength < othLength ? -1 : 0
}

/**
 * Performs common string formatting operations.
 *
 * @memberOf util
 * @param {string} str The string to format.
 * @returns {string} Returns the formatted string.
 */
function format(str) {
  let copy = _.toString(str)

  // Replace all code snippets with a token.
  let snippets = []
  copy = copy.replace(reCode, function(match) {
    snippets.push(match)
    return token
  })

  return (
    copy
      // Add line breaks.
      .replace(/:\n(?=[\t ]*\S)/g, ":<br>\n")
      .replace(/\n( *)[-*](?=[\t ]+\S)/g, "\n<br>\n$1*")
      .replace(/^[\t ]*\n/gm, "<br>\n<br>\n")
      // Normalize whitespace.
      .replace(/\n +/g, " ")
      // Italicize parentheses.
      .replace(/(^|\s)(\(.+\))/g, "$1*$2*")
      // Mark numbers as inline code.
      .replace(/[\t ](-?\d+(?:.\d+)?)(?!\.[^\n])/g, " `$1`")
      // Replace all tokens with code snippets.
      .replace(reToken, function(match) {
        return snippets.shift()
      })
      .trim()
  )
}

/**
 * Parses the JSDoc `comment` into an object.
 *
 * @memberOf util
 * @param {string} comment The comment to parse.
 * @returns {Object} Returns the parsed object.
 */
const parse = _.partial(doctrine.parse, _, {
  lineNumbers: true,
  recoverable: true,
  sloppy: true,
  unwrap: true,
})

module.exports = {
  compareNatural,
  format,
  parse,
}
