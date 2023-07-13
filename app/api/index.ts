import { BASE_WEATHER_URL, BASE_FORECAST_URL } from '../constants'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { WEATHER_API_KEY } from '@env'

export function getWeather(cityName: string) {
	return fetch(`${BASE_WEATHER_URL}?q=${cityName}&appid=${WEATHER_API_KEY}`)
		.then(response => {
			if (!response.ok) {
				return { errorMessage: 'City not found' }
			}

			return response.json()
		})
		.catch(error => {
			return { errorMessage: error.message }
		})
}

export function getForecast(cityName: string) {
	return fetch(`${BASE_FORECAST_URL}?q=${cityName}&appid=${WEATHER_API_KEY}`)
		.then(response => {
			if (!response.ok) {
				return { errorMessage: 'City not found' }
			}

			return response.json()
		})
		.catch(error => {
			return { errorMessage: error.message }
		})
}
