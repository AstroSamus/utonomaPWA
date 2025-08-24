/* Original component, it was replaced for a much less verbose version
that keeps the good practices from the origial but with less code
as it removes the finite state machine and only uses setters, effects and actions

export const ACTIONS = Object.freeze({
  idling: 'idling',
  showDialog: 'showDialog',
})

export class State {
  #isDialogVisible = false
  #currentAction = ACTIONS.idling

  constructor(effects = {}, actions = {}) {
    this.effects = effects
    this.actions = actions
  }

  get isDialogVisible() {
    return this.#isDialogVisible
  }

  set isDialogVisible(value) {
    this.#isDialogVisible = value
    this.effects.isDialogVisible?.()
  }

  get currentAction() {
    return this.#currentAction
  }

  set currentAction({value, payload }) {
    if (!Object.values(ACTIONS).includes(value)) {
      throw new Error(`Invalid action: "${value}". Must be one of: ${Object.values(ACTIONS).join(', ')}`)
    }
    this.#currentAction = value
    this.actions[this.#currentAction]?.(payload)
  }
}


export const ThisContentCanBeDeleted = ($container) => {
  const $dialog = $container
  const $understoodButtton = $container.querySelector('button')

  const effects = {
    isDialogVisible: () => {
      state.isDialogVisible ? $dialog.showModal() : $dialog.close()
    }
  }

  const actions = {
    showDialog: async() => {
      state.isDialogVisible = true
      return new Promise((resolve) => {
        $understoodButtton.addEventListener('click', function onClick() {
          $understoodButtton.removeEventListener('click', onClick)
          state.isDialogVisible = false
          state.currentAction = { value: ACTIONS.idling }
          resolve(true)
        })
      })
    }
  }

  const state = new State(effects, actions)

  return state
}
*/

export class State {
  #isDialogVisible = false
  constructor(effects = {}, actions = {}) {
    this.effects = effects
    this.actions = actions
  }

  get isDialogVisible() {
    return this.#isDialogVisible
  }

  set isDialogVisible(value) {
    this.#isDialogVisible = value
    this.effects.isDialogVisible?.()
  }
}

export const ThisContentCanBeDeleted = ($container) => {
  const $dialog = $container
  const $understoodButtton = $container.querySelector('button')

  const effects = {
    isDialogVisible: () => {
      state.isDialogVisible ? $dialog.showModal() : $dialog.close()
    }
  }

  const actions = {
    showDialog: async() => {
      state.isDialogVisible = true
      return new Promise((resolve) => {
        $understoodButtton.addEventListener('click', function onClick() {
          $understoodButtton.removeEventListener('click', onClick)
          state.isDialogVisible = false
          resolve(true)
        })
      })
    }
  }

  const state = new State(effects, actions)

  return state
}