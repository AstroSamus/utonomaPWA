export const Dialog = ($container, {accepted, canceled}, variant) => {

  const $buttonAccept = $container.querySelector('[data-id="button-accept"]')
  const $buttonCancel = $container.querySelector('[data-id="button-cancel"]')

  return {
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