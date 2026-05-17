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
      $container.showModal()
      const controller = new AbortController()
      return new Promise((resolve) => {
        $buttonAccept.addEventListener('click', () => {
          resolve(true)
          controller.abort()
          $container.close()
        }, { signal: controller.signal })
        $buttonCancel.addEventListener('click', () => {
          resolve(false)
          controller.abort()
          $container.close()
        }, { signal: controller.signal })
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