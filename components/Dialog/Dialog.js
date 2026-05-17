export const Dialog = ($dialog, props, variant) => {

  const $buttonAccept = $dialog.querySelector('[data-id="button-accept"]')
  const $buttonCancel = $dialog.querySelector('[data-id="button-cancel"]')

  switch (variant.severity) {
    case 'WARNING':
      $dialog.classList.add('dialog--warning', 'dialog--decision')
      break;
  }
  switch (variant.intention) {
    case 'DECISION' :
      break
    case 'ALERT' :
      $buttonAccept.style.display = 'none'
      break
  }


  return {
    alert: () => {
      $dialog.showModal()
    },
    ask: () => {
      if(variant?.intention !== 'DECISION') {
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
    toast: (miliseconds) => {
      $container.showModal()
      setTimeout(() => {
        $container.close()
      }, miliseconds)
    }
  }
}