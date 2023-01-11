
/**
 * Returns a percentage completed within a range, as well as a color which progresses from green to red relating to the 
 * percentage
 */
const calculateRange = (value, lowRange, highRange) => {
  //Converts range into a percentage for width and a color from scale green to red
  let percentage = (value - lowRange) / (highRange - lowRange)
  let percentageStr = Math.round(percentage * 100).toString() + '%'
  var hue = ((1 - percentage) * 120).toString(10)
  let result = [['hsl(', hue, ',80%,50%)'].join(''), percentageStr]
  return result
}

export default { calculateRange }
