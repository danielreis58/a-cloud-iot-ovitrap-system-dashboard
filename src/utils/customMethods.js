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
export const andB = (a, b) => a & b
export const nandB = (a, b) => !(a & b)
export const orB = (a, b) => a | b
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
  if (isArray(array)) {
    if (!key) {
      return { ...array }
    }
    return array.reduce((obj, cur) => {
      obj[cur?.[key]] = cur
      return obj
    }, {})
  }
  return {}
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
