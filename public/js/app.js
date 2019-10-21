const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMsg = document.querySelector('.error-msg')
const locationMsg = document.querySelector('.location-msg')
const forecastMsg = document.querySelector('.forecast-msg')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  locationMsg.textContent = "Loading...."

  const location = search.value
  fetch('/weather?address='+location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        errorMsg.textContent = data.error
        locationMsg.textContent = ""
        forecastMsg.textContent = ""
      } else {
        errorMsg.textContent = ""
        locationMsg.textContent = data.location
        forecastMsg.textContent = data.forecast.summary
      }
    })  
  })
})