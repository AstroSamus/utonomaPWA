/**
 * @typedef {Object} DialogProps
 * @property {string} title
 * @property {string} text
 * @property {string} cancelText
 * @property {string} [acceptText] This prop can be avoided in the alert intention
 * variant as the cancel button is the only option visible
 */

/**
 * @typedef {Object} DialogVariant
 * @property {'warning'|'success'|'normal'} severity
 * @property {'decision'|'alert'|'toast'} intention
 */

/**
 * @param {HTMLDialogElement} $dialog
 * @param {DialogProps} props
 * @param {DialogVariant} variant
 */
export const Dialog = ($dialog, props, variant) => {
  const {
    title,
    text,
    cancelText,
    acceptText
  } = props

  const {
    severity,
    intention
  } = variant

  const $buttonAccept = $dialog.querySelector('[data-id="button-accept"]')
  const $buttonCancel = $dialog.querySelector('[data-id="button-cancel"]')

  $dialog.querySelector('div:first-child').innerText = title
  $dialog.querySelector('p').innerText = text
  $buttonAccept.innerText = acceptText
  $buttonCancel.innerText = cancelText

  switch (severity) {
    case 'warning':
      $dialog.classList.add('dialog--warning', 'dialog--decision')
      break;
    case 'success': 
      $dialog.classList.add('dialog--success', 'dialog--alert')
  }
  switch (intention) {
    case 'decision' :
      break
    case 'alert' :
      $buttonAccept.style.display = 'none'
      break
  }


  return {
    alert: () => {
      $dialog.showModal()
    },
    /**
     *  Opens the dialog and waits for the user's decision.
     *  @returns {Promise<boolean>} `true` if the user accepts the dialog, otherwise `false`
     * 
     */
    ask: () => {
      if(variant.intention !== 'decision') {
        throw new Error('Cannot use ask if dialog intention is not DECISION')
      }

      $dialog.showModal()
      return new Promise((resolve) => {
        $dialog.addEventListener('close', () => {
          if($dialog.returnValue === 'accept') {
            resolve(true)
          } else {
            resolve(false)
          }
          $dialog.close()
        }, { once: true })
      })
    },
    /** @param {number} miliseconds The amount of miliseconds that the toast will show*/
    toast: (miliseconds) => {
      $dialog.showModal()
      setTimeout(() => {
        $dialog.close()
      }, miliseconds)
    }
  }
}