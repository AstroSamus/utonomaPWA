/**
 * Validate if a video duration is longer than a certain amount of time
 * @param {object} $videoDomElement - A video tag in the dom where the video can be loaded (this 
 * element will be hidden from user)
 * @param {object} file - A File javascript object containing the video
 * @param {Number} maxDuration - The maximum time of seconds for the video to be considered valid
 * @returns {Promise} True if the video lasts less than the max duration time, false if it's longer
 * @throws {Error} If the html element provided in $videoDomElement is not a video tag, have no source 
 * or if the video its not in mp4 or webm formats. Also, in case that the File is not a video
 */
export async function validateVideoDuration($videoDomElement, file, maxDuration) {
  if(file.type !== 'video/mp4' && file.type !== 'video/webm') throw new Error('Wrong video format')
  return new Promise((resolve) => {
    var reader = new FileReader()

    reader.onload = function(e) {
      if(!$videoDomElement.src) throw new Error('Invalid video tag')
      $videoDomElement.src = e.target.result
      $videoDomElement.load()
      $videoDomElement.onloadedmetadata = function() {
        if(this.duration <= maxDuration) resolve(true) 
        else resolve(false)
      }
    }
    try{
      reader.readAsDataURL(file);
    }
    catch(error) {
      throw new Error('invalid file object provided')
    }
  }) 
}

export function canContentBeHarvested(likes, dislikes, harvestedLikes) {
  if(
    typeof likes ==='bigint' || 
    typeof dislikes ==='bigint' || 
    typeof harvestedLikes ==='bigint'
  ) throw new Error('CanContentBeHarvested cannot receive bigInts, only numbers')

  if(
    typeof likes !=='number' || 
    typeof dislikes !=='number' || 
    typeof harvestedLikes !=='number'
  ) return false

  const minimumQuorum = 6
  if(likes + dislikes < minimumQuorum) return false
  const likesToHarvest = likes - dislikes - harvestedLikes
  if(likesToHarvest <= 0) return false
  return !shouldContentBeEliminated(likes, dislikes)
}

export function shouldContentBeEliminated(likes, dislikes) {
  //If there are 0 dislikes return false as a content without dislikes can't be eliminated
  if(dislikes === 0) return false
  const n = likes + dislikes
  const p = dislikes / n
  const z = 1.96

  const result = p - z*(Math.sqrt((p*(1-p))/(n)))

  return result > 0.5
}