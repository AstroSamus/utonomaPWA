export const FilePicker = ($container, params, variant) => {

  const {
    validation,
    callback,
    required
   } = params

  const $fileInput = $container.querySelector('input')

  $fileInput.addEventListener('change', async(event) => {
    $fileInput.disabled = true
    console.log('change detected')
    const files = event.target.files
    
    if(!files || files.length === 0) {
      if(required === true) {
        showErrorMessage('File is required')
      }
      $fileInput.disabled = false
      return
    }

    const [error, data] = await validation(files[0])
    console.log('validation completed')
    $fileInput.disabled = false //enable the file input before showing the error
    //otherwise it will not be displayed
    if(error) {
      await showErrorMessage(error)
    } else {
      callback(files[0])
    }
  })

  async function showErrorMessage(message) {
    console.log('show error message')
    $fileInput.setCustomValidity(message)
    $fileInput.reportValidity()
  }

}