export type WeatherDataType = {
	weather: WeatherType | { errorMessage?: string }
	forecast: ForecastType | { errorMessage?: string }
}

export type WeatherType = {
	base: string
	clouds: {
		all: number
	}
	cod: number
	coord: {
		lat: number
		lon: number
	}
	dt: number
	id: number
	main: {
		feels_like: number
		humidity: number
		pressure: number
		temp: number
		temp_max: number
		temp_min: number
	}
	name: string
	sys: {
		country: string
		id: number
		sunrise: number
		sunset: number
		type: number
	}
	timezone: number
	visibility: number
	weather: {
		description: string
		icon: string
		id: number
		main: string
	}[]
	wind: {
		deg: number
		speed: number
	}
}

export type ForecastType = {
	city: {
		coord: {
			lat: number
			lon: number
		}
		country: string
		id: number
		name: string
		population: number
		sunrise: number
		sunset: number
		timezone: number
	}
	cnt: number
	cod: string
	list: {
		clouds: {
			all: number
		}
		dt: number
		dt_txt: string
		main: {
			feels_like: number
			humidity: number
			pressure: number
			temp: number
			temp_max: number
			temp_min: number
		}
		pop?: number
		rain?: {
			'3h': number
		}
		sys: {
			pod: string
		}
		visibility: number
		weather: {
			description: string
			icon: string
			id: number
			main: string
		}[]
		wind: {
			deg: number
			speed: number
		}
	}[]
	message: number
}

export const TEMPERATURE = {
	CELSIUS: 'C',
	FAHRENHEIT: 'F',
	KELVIN: 'K',
} as const

export type TemperatureUnitType = (typeof TEMPERATURE)[keyof typeof TEMPERATURE]
