/* eslint-disable valid-typeof */
/* eslint-disable no-plusplus */
import jwt from 'jwt-decode'

/*
===========================================
Tech4humans - Custom methods
-------------------------------------------
  Version: 1.0
===========================================
*/

/* ----------------------------------------
 Comparison
 ----------------------------------------*/
export const and = (a, b) => a && b
export const nand = (a, b) => !(a && b)
export const or = (a, b) => a || b
export const xor = (a, b) => or(a, b) && nand(a, b)

// Bitwise
export const andB = (a, b) => a && b
export const nandB = (a, b) => !(a && b)
export const orB = (a, b) => a || b
export const xorB = (a, b) => orB(a, b) && nandB(a, b)

/* ----------------------------------------
   Types
   ----------------------------------------*/
// not: null, undefined, NaN, empty string (""), false
export const isValid = (el) => el || el === 0
export const typeOf = (obj, type) => isValid(obj) && typeof obj === type
export const isArray = (array) => array && Array.isArray(array)
export const isFunction = (func) => typeOf(func, 'function')
export const isObject = (obj) => typeOf(obj, 'object') && !isArray(obj)
export const isNumber = (num) => typeOf(num, 'number')

export function isUndefined(o) {
  return typeof o === 'undefined'
}

// Include NaN
// export function isNumber(o) {
//   return typeof o === "number";
// }

export function isInteger(o) {
  return typeof o === 'number' && o % 1 === 0
}

export function isString(o) {
  return typeof o === 'string'
}

export function isDate(o) {
  return Object.prototype.toString.call(o) === '[object Date]'
}

export function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top
}

/* ----------------------------------------
   Short version
   ----------------------------------------*/
export const objLength = (ob) => (isObject(ob) ? Object.keys(ob).length : 0)
export const getTimestamp = (date) => new Date(date).getTime()

/* ----------------------------------------
   Array methods
   ----------------------------------------*/
export const find = (array, condition, isReverse) => {
  if (isArray(array) && isFunction(condition)) {
    const lastIndex = array.length - 1

    if (!isReverse) {
      for (let index = 0; index <= lastIndex; index++)
        if (condition(array[index])) return array[index]
    } else {
      for (let index = lastIndex; index >= 0; index--)
        if (condition(array[index])) return array[index]
    }
  }
  return null
}

export const findBetween = (array, start, end, condition, isReverse) => {
  if (isArray(array) && isNumber(start) && isNumber(end)) {
    const list = array.slice(start, end)
    return find(list, condition, isReverse)
  }
  return null
}

export const arrayToObj = (array, key) => {
  let response = {}
  if (isArray(array)) {
    if (key) {
      response = array.reduce(
        (obj, item) => ({ ...obj, [item[key]]: item }),
        {}
      )
    } else {
      response = { ...array }
    }
  }
  return response
}

export const objToArray = (obj, withKey) => {
  let response = []
  if (isObject(obj)) {
    if (withKey) {
      response = Object.entries(obj).map((e) => ({ [e[0]]: e[1] }))
    } else {
      response = Object.values(obj)
    }
  }
  return response
}

/* ----------------------------------------
   Auth
   ----------------------------------------*/
export const isValidToken = (token) => {
  if (token) {
    const expireDate = new Date(jwt(token)?.exp * 1000).getTime()
    const now = new Date().getTime()

    if (now < expireDate) return true
  }
  return false
}

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)

export const stableSort = (array, order, orderBy) => {
  const comparator = getComparator(order, orderBy)
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const pos = comparator(a[0], b[0])
    if (pos !== 0) return pos
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export const toIsoString = (date) => {
  const tzo = -date.getTimezoneOffset()
  const dif = tzo >= 0 ? '+' : '-'
  const pad = (num) => {
    const norm = Math.floor(Math.abs(num))
    return (norm < 10 ? '0' : '') + norm
  }

  const result = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}${dif}${pad(tzo / 60)}:${pad(tzo % 60)}`

  return result
}
