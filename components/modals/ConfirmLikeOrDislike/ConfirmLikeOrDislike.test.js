import { createStateForConfirmLikeOrDislike } from './ConfirmLikeOrDislike.state.js'
import { jest } from '@jest/globals'

describe('createStateForConfirmLikeOrDislike', () => {
  let state

  beforeEach(() => {
    state = createStateForConfirmLikeOrDislike()
  })

  test('initial state should be correct', () => {
    expect(state.isDialogVisible()).toBe(false)
    expect(state.feeForVoting()).toBe('-')
  })

  test('setIsDialogVisible should update isDialogVisible to a new different value and call effect', async () => {
    const effectMock = jest.fn().mockResolvedValue()

    await state.setIsDialogVisible(true, effectMock)
    expect(state.isDialogVisible()).toBe(true)
    expect(effectMock).toHaveBeenCalled()

    // Trying to set the same value shouldn't trigger the effect again
    effectMock.mockClear()
    await state.setIsDialogVisible(true, effectMock)
    expect(effectMock).not.toHaveBeenCalled()
  })

  test('setFeeForVoting should update feeForVoting and call effect', () => {
    const effectMock = jest.fn()

    state.setFeeForVoting(100, effectMock)
    expect(state.feeForVoting()).toBe(100)
    expect(effectMock).toHaveBeenCalled()

    // Trying to set the same value shouldn't trigger the effect again
    effectMock.mockClear()
    state.setFeeForVoting(100, effectMock)
    expect(effectMock).not.toHaveBeenCalled()
  })

  test('setFeeForVoting should reset to "-" if newValue is invalid', () => {
    //first set feeForVoting to a number, so you can see it reset back to '-'
    state.setFeeForVoting('100', () => {})
    state.setFeeForVoting(undefined, () => {})
    
    expect(state.feeForVoting()).toBe('-')

    state.setFeeForVoting(80, () => {})
    state.setFeeForVoting(NaN, () => {})
    
    expect(state.feeForVoting()).toBe('-')

    state.setFeeForVoting('65464.5654', () => {})
    state.setFeeForVoting(null, () => {})

    expect(state.feeForVoting()).toBe('-')

  })
})