document.querySelector("#button-short-video-input").addEventListener("click", () => {
  $shortVideoInput.click()
})

const $shortVideoInput = document.querySelector("#short-video-input")
const $stepOne = document.querySelector("#step-1")
const $stepTwo = document.querySelector("#step-2")
const $stepTwoVideo = document.querySelector("#step-2-video")
const $stepThree = document.querySelector("#step-3")
const $stepFour = document.querySelector("#step-4")


$shortVideoInput.addEventListener("change", () => {
  if ($shortVideoInput.files.length == 1) {
    $stepOne.style.display = "none"
    $stepTwo.style.display =  "flex"
    var reader = new FileReader();
    reader.onload = function(e) {
      $stepTwoVideo.src = e.target.result
      $stepTwoVideo.play()
    }.bind(this)
    reader.readAsDataURL($shortVideoInput.files[0]);
  }
})

document.querySelector("#button-continue-step-2").addEventListener("click", () => {
  $stepTwo.style.display = "none"
  $stepThree.style.display = "flex"
  $stepTwoVideo.pause()
})

document.querySelector("#button-continue-step-3").addEventListener("click", () => {
  //document.querySelector("#short-video-title-input").value
  $stepThree.style.display = "none"
  $stepFour.style.display = "flex"
})

document.querySelector("#button-continue-step-4").addEventListener("click", () => {
  console.log("upload to ipfs")
})