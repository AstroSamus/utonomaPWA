export const Dialog = ($dialog, props, variant) => {
  
  const {
    title,
    text,
    cancel,
    accept
  } = props

  const {
    severity,
    intention
  } = variant

  $dialog.querySelector('div:first-child').innerText = title
  $dialog.querySelector('p').innerText = text
  $dialog.querySelector('button:last-child').innerText = accept
  $dialog.querySelector('button:first-child').innerText = cancel

  switch (severity) {
    case 'WARNING':
      $dialog.classList.add('dialog--warning', 'dialog--decision')
      break;
  }
  switch (intention) {
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
      $dialog.showModal()
      setTimeout(() => {
        $dialog.close()
      }, miliseconds)
    }
  }
}