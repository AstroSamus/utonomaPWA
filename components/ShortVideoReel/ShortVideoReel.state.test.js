import {
  createStateForShortVideoReel
} from './ShortVideoReel.state'

const state = createStateForShortVideoReel()

const shortVideos = [
  {'cid' : '16546'},
  {'cid' : '23456'}
]

function* shortVideosMaker() {
  /*
  let index = 0
  while (index < shortVideos.length) yield shortVideos[index]
  */
  yield shortVideos[0]
  yield shortVideos[1]
}

const gen = shortVideosMaker()

function getShortVideoMockApi() {
  return gen.next().value
}

test('At the creation of the short video reel component, the state should be the initial', ()=> {
  expect(state.shortVideoHistory()).toEqual([])
  expect(state.currentVideo()).toEqual(-1)
  expect(state.detachedHead()).toEqual(false)
})

test('Given the initial state, if we try to get the previous short video nothing should happen to the state', () => {
  state.setStep(state.availiableSteps.previousShortVideo)

  expect(state.shortVideoHistory()).toEqual([])
  expect(state.currentVideo()).toEqual(-1)
  expect(state.detachedHead()).toEqual(false)
})

test('Given the initial state, if we go to the nextShortVideoStep, the detached head should be in false and the current video should remain the same', async() => {
  state.setStep(state.availiableSteps.nextShortVideo)
  
  expect(state.currentVideo()).toEqual(-1)
  expect(state.detachedHead()).toEqual(false)
})

test('Once the first short video was played correctly, we should inform it by pushing the data of it into the shortVideoHistory', () => {
  state.setStep(state.availiableSteps.informCorrectPlay, undefined, getShortVideoMockApi())

  expect(state.currentVideo()).toEqual(0)
  expect(state.shortVideoHistory().length).toEqual(1)
})

test('Being in the first video of the reel, if we try to get the previous short video, nothing should happen and the state should remain the same', () => {
  state.setStep(state.availiableSteps.previousShortVideo)

  expect(state.currentVideo()).toEqual(0)
  expect(state.detachedHead()).toEqual(false)
  expect(state.shortVideoHistory().length).toEqual(1)
})

test('Being in the first video of the reel, if we go to the nextShortVideo step, the detached head should be in false', () => {
  state.setStep(state.availiableSteps.nextShortVideo)

  expect(state.detachedHead()).toEqual(false)
})

test('Once the second short video was played correctly, we should inform it by pushing the data of it into the shortVideoHistory', () => {
  state.setStep(state.availiableSteps.informCorrectPlay, undefined, getShortVideoMockApi())

  expect(state.currentVideo()).toEqual(1)
  expect(state.shortVideoHistory().length).toEqual(2)
})

test('Being in the second video of the reel, if we go to the previousShortVideo step, the current video should be 1 and detached head should be true', () => {
  state.setStep(state.availiableSteps.previousShortVideo)

  expect(state.currentVideo()).toEqual(0)
  expect(state.detachedHead()).toEqual(true)
})

test('Being in the first video of the reel, if we go to the nextShortVideo step, the current video should be 1', () => {
  state.setStep(state.availiableSteps.nextShortVideo)

  expect(state.currentVideo()).toEqual(1)
})

test('Being in the second video of the reel, comming from the first video, we should inform the correct play but we should not push the video as new, as it came from the history and the detached head should be false', () => {
  state.setStep(state.availiableSteps.informCorrectPlay, undefined, {'cid' : '98798797'})

  expect(state.shortVideoHistory().length).toEqual(2)
  expect(state.detachedHead()).toEqual(false)
})
