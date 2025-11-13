/**
 * Generates a unique random number within a specified range that is not 
 * already present in a given array of used numbers.
 * @param {number} upperLimit - The upper limit of the range from which to 
 * generate the random number.
 * @param {Array.<number>} usedNumbersArray - An array of numbers that have 
 * already been used and should be excluded from the result.
 * @returns {number|null} - A random number that has not been used before, 
 * within the specified range, or `null` if no more unique numbers are 
 * available.
 */
export function getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray) {
  const numberSet = new Set(usedNumbersArray)
  if(numberSet.size >= upperLimit) return null // No more numbers to generate
  let newNumber
  do {
    newNumber = Math.floor(Math.random() * upperLimit)
  } while (numberSet.has(newNumber))
  return newNumber
}