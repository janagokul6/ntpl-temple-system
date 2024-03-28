const downloadFileFunc = (url) => {
  let prevUrl = url
  fetch(url, {
    method: 'GET',
  })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      let name = prevUrl.split('/')[prevUrl.split('/').length - 1]
      console.log(prevUrl)
      console.log(name)
      link.setAttribute('download', name)

      // Append to html link element page
      document.body.appendChild(link)

      // Start download
      link.click()

      // Clean up and remove the link
      link.parentNode.removeChild(link)
    })
}

module.exports = downloadFileFunc
