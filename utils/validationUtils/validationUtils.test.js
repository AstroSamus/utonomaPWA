import { 
  validateVideoDuration, 
  shouldContentBeEliminated,
  canContentBeHarvested 
} from "./validationUtils.js"

describe('validateVideoDuration', () => {
  document.body.innerHTML = '<video id="videoTag"> </video>'
  const $videoTag = document.querySelector('#videoTag')

  test('when not receiving a File object in the file parameter should throw an error', async() => {
    const errorMessage = 'invalid file object provided'

    await expect(
      validateVideoDuration($videoTag, { type: 'video/webm' }, 60)
    ).rejects.toThrow(errorMessage)
  })

  test('when receiving a File object that its not it mp4 or webm formats should throw an error', async() => {
    const errorMessage = 'Wrong video format'

    await expect(
      validateVideoDuration($videoTag, { type: 'video/quicktime' }, 60) //mock a video recorded from an iphone (.mov extension)
    ).rejects.toThrow(errorMessage)
  })

})

//shouldContentBeEliminated
const shouldContentBeEliminatedPositiveCases = [
  [24, 76],
  [1, 8],
  [0, 6],
  [13, 47],
  [43310, 98100],
  [4950000000, 10050000000],
  [25, 75],
  [80,107]
]
test.each(shouldContentBeEliminatedPositiveCases)(
  "shouldContentBeEliminated method, when receiving %p likes and %p dislikes, should return true",
  (likes, dislikes) => {
    const result = shouldContentBeEliminated(likes, dislikes)
    expect(result).toBe(true)
  }
)

const shouldContentBeEliminatedNegativeCases = [
  [6, 1],
  [15, 1],
  [10, 8],
  [20, 5],
  [420, 280],
  [8, 0],
  [44, 56],
  [9759000000, 5241000000],
  [80, 106],
  ['a string', 'another string'],
  [0,0],
  [-1,0],
  [-5,-45]
]
test.each(shouldContentBeEliminatedNegativeCases)(
  "shouldContentBeEliminated method, when receiving %p likes and %p dislikes, should return false",
  (likes, dislikes) => {
    const result = shouldContentBeEliminated(likes, dislikes)
    expect(result).toBe(false)
  }
)

//canContentBeHarvested
const canContentBeHarvestedPositiveCases = [
  [6, 1, 0],
  [15, 1, 13],
  [10, 8, 0],
  [20, 5, 8],
  [420, 280, 139],
  [8, 0, 6],
  [9759000000, 5241000000, 1000]
]
test.each(canContentBeHarvestedPositiveCases)(
  "canContentBeHarvested method, when receiving %p likes and %p dislikes and %p harvested likes, should return true",
  (likes, dislikes, harvestedLikes) => {
    const result = canContentBeHarvested(likes, dislikes, harvestedLikes)
    expect(result).toBe(true)
  }
)

const canContentBeHarvestedNegativeCases = [
  [24, 76, 4],
  [1, 8, 0],
  [0, 6, 15],
  [13, 47, 0],
  [43310, 98100, 1000000000000000],
  [4950000000, 10050000000, 100],
  [25, 75, 6548],
  [80,107, 'fsafeafseafe'],
  [1,1,0],
  [10000000000, 0, 10000000000],
  ['likes', '', 'harvestedLikes']
]
test.each(canContentBeHarvestedNegativeCases)(
  "canContentBeHarvested method, when receiving %p likes and %p dislikes and %p harvested likes, should return true",
  (likes, dislikes, harvestedLikes) => {
    const result = canContentBeHarvested(likes, dislikes, harvestedLikes)
    expect(result).toBe(false)
  }
)

test('canContentBeHarvested when receiving bigInt in any of the parameters, should throw an error', () => {
  const errorMessage = 'CanContentBeHarvested cannot receive bigInts, only numbers'
  
  expect(() => canContentBeHarvested(BigInt(50), 50, 10)).toThrow(errorMessage)
})
