/**
 * Check if string is a number
 */
export const isNumber = (str) => {
  if (typeof str != 'string') return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

/**
 * Downloads the report/raw data as a CSV file for access by researchers
 * param: svg = csv, file name
 */
export const downloadSVG = (svg, name) => {
  const url = window.URL.createObjectURL(new Blob([svg]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${name}.csv`)
  document.body.appendChild(link)
  link.click()
}

export default isNumber
