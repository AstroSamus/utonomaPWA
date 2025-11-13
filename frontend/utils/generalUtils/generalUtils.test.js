import { getUniqueRandomNumberFromArray } from "./generalUtils.js"

describe('getUniqueRandomNumberFromArray', () => { 
  it('should generate a unique number when the array is empty', () => {
    const upperLimit = 10
    const usedNumbersArray = []
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThan(upperLimit)
  })

  it('should generate a unique number when the array has some used numbers', () => {
    const upperLimit = 10
    const usedNumbersArray = [1, 3, 5]
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThan(upperLimit)
    expect(usedNumbersArray).not.toContain(result)
  })

  it('should return null when no more unique numbers are available', () => {
    const upperLimit = 3
    const usedNumbersArray = [0, 1, 2]
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray)

    expect(result).toBeNull()
  })

  it('should return null when upperLimit is 0', () => {
    const upperLimit = 0
    const usedNumbersArray = []
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray);

    expect(result).toBeNull()
  })

  it('should return 0 when upperLimit is 1 and the array is empty', () => {
    const upperLimit = 1
    const usedNumbersArray = []
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray)

    expect(result).toBe(0)
  })

  it('should return null when upperLimit is 1 and the only number is already used', () => {
    const upperLimit = 1
    const usedNumbersArray = [0]
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray)

    expect(result).toBeNull()
  })

  it('should generate a unique number even with a large upperLimit', () => {
    const upperLimit = 1000
    const usedNumbersArray = [1, 2, 3, 4, 5]
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThan(upperLimit)
    expect(usedNumbersArray).not.toContain(result)
  })

  it('should return null when the usedNumbersArray exhausts all possible numbers', () => {
    const upperLimit = 5
    const usedNumbersArray = [0, 1, 2, 3, 4]
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray)

    expect(result).toBeNull()
  })

  it('should generate a unique number even with non-sequential used numbers', () => {
    const upperLimit = 10
    const usedNumbersArray = [0, 2, 4, 6, 8]
    const result = getUniqueRandomNumberFromArray(upperLimit, usedNumbersArray)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThan(upperLimit)
    expect(usedNumbersArray).not.toContain(result)
  })

})