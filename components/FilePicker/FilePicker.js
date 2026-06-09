/**
 * @typedef {Object} FilePickerProps
 * @property {(file: File) => void} callback A callback method that sets the File in the context 
 * of the caller, you can also add side effects
 * @property {(file: File) => Promise<[errorMessage: string | null, result: boolean | null ]> | [errorMessage: string | null, result: boolean | null ]} validation 
 * Callback function that validates the input, you can return custom messages to show to the user on error
 * @property {boolean} required Sets if picking a file is required or not
 */

/**
 * @param {HTMLInputElement} $container
 * @param {FilePickerProps} props
 */
export const FilePicker = ($container, props) => {

  const {
    validation,
    callback,
    required
   } = props

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