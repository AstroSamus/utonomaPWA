/**
 * @typedef { 'UNSUPPORTED_VIDEO_FORMAT' | 'FILE_IS_NOT_A_VIDEO' | 'VIDEO_TOO_LONG' | 'FILE_IS_TOO_BIG' } VideoValidationError
 */

/** 
 * Validate if a video duration is longer than a certain amount of time or size
 * @param {HTMLVideoElement} $videoDomElement - A video tag in the dom where the video src can be loaded (this 
 * element will be hidden from user)
 * @param {File} file - A File javascript object containing the video
 * @param {number} maxDuration - The maximum time of seconds for the video to be considered valid
 * @param {number} maxSize - The maximum size of the video in MB
 * @returns {Promise<[VideoValidationError|null, boolean|null]>} An error first tuple telling the error code 
 * and a boolean true if succeded
 * @throws {Error} If the html element provided in $videoDomElement.
 */
export async function validateVideoDuration(
  $videoDomElement, 
  file, 
  maxDuration,
  maxSize
) {
  //validate type
  const isVideo = file?.type?.split('/')[0] === 'video'
  if(!isVideo) return ['FILE_IS_NOT_A_VIDEO', false]
  //validate size
  if(file.size / 1024 / 1024 > maxSize ) {
    return ['FILE_IS_TOO_BIG', false]
  }

  return new Promise((resolve, reject) => {
    var reader = new FileReader()

    reader.onload = function(e) {
      $videoDomElement.src = e.target.result
      $videoDomElement.load()
      $videoDomElement.onloadedmetadata = function() {
        //validate duration
        if(this.duration <= maxDuration) resolve([null, true]) 
        else resolve(['VIDEO_TOO_LONG', false])
      }
    }
    try{
      if(!$videoDomElement.src) throw new Error('Invalid video tag in validate video duration')
      reader.readAsDataURL(file);
    }
    catch(error) {
      if(error.message === 'Invalid video tag in validate video duration') {
        reject(error)
      }
      else resolve(['UNSUPPORTED_VIDEO_FORMAT', false])
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
  const minimumQuorum = 6
  if(n < minimumQuorum) return false
  const p = dislikes / n
  const z = 1.96

  const result = p - z*(Math.sqrt((p*(1-p))/(n)))

  return result > 0.5
}