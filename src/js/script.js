const inputCityName = document.querySelector('.area-box__input')
const searchBtn = document.querySelector('.area-box__btn')
const cityNameBox = document.querySelector('.weather-boxes__city')
const error = document.querySelector('.error__text')
const bgImage = document.querySelector('body')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '?????????????????????????????????'
const API_UNITS = '&units=metric'

const showWeather = () => {
	const city = inputCityName.value
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			const weatherName = res.data.weather[0]
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const wind = res.data.wind.speed

			if (weatherName.id >= 200 && weatherName.id <= 232) {
				bgImage.style.backgroundImage = "url('./dist/img/thunderstorm-big.jpg')"
				weather.textContent = 'burza'
			} else if (weatherName.id >= 300 && weatherName.id <= 321) {
				bgImage.style.backgroundImage = "url('./dist/img/drizzle-big.jpg')"
				weather.textContent = 'mżawka'
			} else if (weatherName.id >= 500 && weatherName.id <= 531) {
				bgImage.style.backgroundImage = "url('./dist/img/rain-big.jpg')"
				weather.textContent = 'deszcz'
			} else if (weatherName.id >= 600 && weatherName.id <= 622) {
				bgImage.style.backgroundImage = "url('./dist/img/ice-big.jpg')"
				weather.textContent = 'śnieg'
			} else if (weatherName.id === 741) {
				bgImage.style.backgroundImage = "url('./dist/img/fog-big.jpg')"
				weather.textContent = 'mgła'
			} else if (weatherName.id === 800) {
				bgImage.style.backgroundImage = "url('./dist/img/sun-big.jpg')"
				weather.textContent = 'słonecznie'
			} else if (weatherName.id >= 801 && weatherName.id <= 804) {
				bgImage.style.backgroundImage = "url('./dist/img/cloud-big.jpg')"
				weather.textContent = 'zachmurzenie'
			} else {
				bgImage.style.backgroundImage = "url('./dist/img/default-big.jpg')"
				weather.textContent = '...'
			}

			cityNameBox.textContent = res.data.name
			temperature.innerHTML = Math.floor(temp) + '&#8451;'
			humidity.textContent = hum + '%'
			windSpeed.textContent = (wind * 3.6).toFixed(2) + ' km/h'
			error.textContent = ''
			inputCityName.value = ''
		})
		.catch(() => (error.textContent = 'Wpisz poprawną nazwę miasta!'))
}

const checkEnter = e => {
	if (e.key === 'Enter') {
		showWeather()
	}
}

searchBtn.addEventListener('click', showWeather)
inputCityName.addEventListener('keyup', checkEnter)
