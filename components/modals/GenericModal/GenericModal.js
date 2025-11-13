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

export const GenericModal = ($container) => {
  const $dialog = $container

  const effects = {
    isDialogVisible: () => {
      state.isDialogVisible ? $dialog.showModal() : $dialog.close()
    }
  }

  const actions = {
    showDialog: async() => {
      state.isDialogVisible = true
      return new Promise((resolve) => {
        if(state.isDialogVisible) {
          $dialog.showModal()
          $dialog.addEventListener('close', function onClose() {
            if($dialog.returnValue === 'confirm') {
              resolve(true)
            }
            else resolve(false)
            $dialog.removeEventListener('close', onClose)
            state.isDialogVisible = false
          })
        }
      })
    }
  }

  const state = new State(effects, actions)

  return state
}