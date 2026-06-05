/**
 * @param {HTMLElement} $container Any HTML tag that encloses the elements 
 * whose visibility will be toggled.
 */
export const HideableContainer = ($container) => {
  //all hidden when component starts
  const $childs = [...$container.children]
  $childs.forEach(el => el.style.visibility = 'hidden')

  return {
    /**
     * @param {string} query A valid CSS selector that identifies the element 
     * to be made visible.
     */
    show: (query) => {
      $childs.forEach(el => {
        if(el instanceof HTMLElement) {
          el.style.visibility = 'hidden'
        }
      })
      const $target = $container.querySelector(query)
      if($target instanceof HTMLElement) $target.style.visibility = 'visible'
    }
  }

}