import "./styles.css"
import { h, render } from "preact"

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration)
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}

const Demo = () => {
  return(
    <div> Hello from react!! { 1 + 1 } </div>
  )
}
  

render(<Demo />, document.getElementById("infiniteScrollOfShortVideos"));