
/**
 * Converts an ENUM to a 'Nice String' 
 * @example fromEnumValue('MY_NICE_STRING') => 'My Nice String'
 * @param {*} enumeration 
 * @yields String
 * @returns implied enum value
 */
export const fromEnumValue = enumeration => {
  if (!enumeration) { return null }
  const underscores = enumeration?.split('_')
  return underscores.reduce((acc, curr, idx) => {
    const newVal = curr[0] + curr.slice(1).toLowerCase()
    return acc += ` ${newVal}`
  }, '').trim()
}

/**
 * For use when implying the ENUM value of a 'Nice String'
 * @example implyEnumValue('My Nice String') => 'MY_NICE_STRING'
 * @param {*} niceValue 
 * @yields String
 * @returns implied enum value
 */
export const implyEnumValue = niceValue => {
  if (!niceValue) { return null }
  const spaces = niceValue?.split(' ')
  return spaces?.reduce((acc, curr, index) => {
    const newVal = curr.toUpperCase()
    if (index === spaces.length - 1) {
      return acc += newVal
    }

    return acc += `${newVal}_`
  }, '')
}