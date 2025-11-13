export class State {
  constructor(effects = {}) {
    this.currentVideo = null;
    this._loading = false;
    this.effects = effects;
  }

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.effects.loading?.();
  }
}

export const ShareButton = ($container) => {
  const $buttonShare = $container
  const $dialogShareButtonTextCopied = document.querySelector('#dialogShareButtonTextCopied')

  const effects = {
    loading: () => {
      if (state.loading) {
        $buttonShare.disabled = true
        $buttonShare.style.visibility = 'hidden'
      } else {
        $buttonShare.disabled = false
        $buttonShare.style.visibility = 'visible'
      }
    }
  }

  const state = new State(effects)

  $buttonShare.addEventListener('click', async() => {
    const shareUrl = `${window.location.origin}?watch=${state.currentVideo}`
    await navigator.clipboard.writeText(shareUrl)
    $dialogShareButtonTextCopied.show()
    setTimeout(() => $dialogShareButtonTextCopied.close(), 2500)
  })
  
  return state
}