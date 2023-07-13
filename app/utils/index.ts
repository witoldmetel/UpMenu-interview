import { TextStyle, ViewStyle } from 'react-native'
import { ForecastType, TemperatureUnitType, WeatherType } from '../types'

export const getButtonStyle = (
	variant: 'text' | 'contained' | 'outlined',
	disabled = false,
): {
	buttonStyle: ViewStyle
	textStyle: TextStyle
} => {
	const baseButtonStyle = {
		opacity: disabled ? 0.5 : 1,
	}
	const baseButtonTextStyle = {
		fontSize: 16,
		fontWeight: 'bold',
	}

	let buttonStyle: ViewStyle, textStyle: TextStyle

	switch (variant) {
		case 'contained':
			buttonStyle = {
				...baseButtonStyle,
				backgroundColor: disabled ? '#D3D3D3' : '#F3E7D1',
			}
			textStyle = {
				...baseButtonTextStyle,
				color: disabled ? '#fff' : '#612e3a',
			} as TextStyle
			break
		case 'outlined':
			buttonStyle = {
				...baseButtonStyle,
				backgroundColor: 'white',
			}
			textStyle = {
				...baseButtonTextStyle,
				color: disabled ? '#D3D3D3' : '#612e3a',
			} as TextStyle
			break
		case 'text':
		default:
			buttonStyle = {
				...baseButtonStyle,
				backgroundColor: 'transparent',
			}
			textStyle = {
				...baseButtonTextStyle,
				color: '#333',
			} as TextStyle
			break
	}

	return {
		buttonStyle,
		textStyle,
	}
}

export const isWeatherResponseCorrect = (
	response: WeatherType | { errorMessage?: string },
): response is WeatherType => {
	return (response as WeatherType).name !== undefined
}

export const isForecastResponseCorrect = (
	response: ForecastType | { errorMessage?: string },
): response is ForecastType => {
	return (response as ForecastType).city !== undefined
}

export const convertTemperature = (temp: number, unit: TemperatureUnitType = 'K') => {
	if (unit === 'F') {
		const fahrenheit = (temp * 9) / 5 + 32

		return Math.round(fahrenheit) + '°F'
	} else if (unit === 'C') {
		const celsius = temp - 273.15

		return Math.round(celsius) + '°C'
	}

	// Default case: Kelvin
	return Math.round(temp) + 'K'
}
