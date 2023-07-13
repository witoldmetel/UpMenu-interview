import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import { WeatherType, ForecastType, TemperatureUnitType, TEMPERATURE } from '../types'
import { Image } from '../components/Image'
import { convertTemperature } from '../utils'

export const WeatherCard = ({ weather, forecast }: { weather: WeatherType; forecast: ForecastType }) => {
	const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnitType>(TEMPERATURE.KELVIN)

	const sections = [
		{ label: 'City Name:', value: weather.name },
		{ label: 'Temperature:', value: convertTemperature(weather.main.temp, temperatureUnit) },
		{ label: 'Description:', value: weather.weather[0].description },
		{ label: 'Humidity:', value: `${weather.main.humidity} %` },
		{ label: 'Pressure:', value: `${weather.main.pressure} hPa` },
		{ label: 'Wind Speed:', value: `${weather.wind.speed} meter/sec` },
	]

	return (
		<View style={styles.weatherContainer}>
			<View style={styles.unitSelectionContainer}>
				<Text style={styles.unitSelectionText}>Temperature Unit:</Text>
				<View style={styles.unitSelectionButtons}>
					<Text
						style={[
							styles.unitSelectionButton,
							temperatureUnit === TEMPERATURE.KELVIN && styles.unitSelectionButtonActive,
						]}
						onPress={() => setTemperatureUnit(TEMPERATURE.KELVIN)}>
						K
					</Text>
					<Text
						style={[
							styles.unitSelectionButton,
							temperatureUnit === TEMPERATURE.CELSIUS && styles.unitSelectionButtonActive,
						]}
						onPress={() => setTemperatureUnit(TEMPERATURE.CELSIUS)}>
						°C
					</Text>
					<Text
						style={[
							styles.unitSelectionButton,
							temperatureUnit === TEMPERATURE.FAHRENHEIT && styles.unitSelectionButtonActive,
						]}
						onPress={() => setTemperatureUnit(TEMPERATURE.FAHRENHEIT)}>
						°F
					</Text>
				</View>
			</View>
			<View style={styles.infoSection}>
				<Image icon={weather.weather[0].icon} style={styles.weatherIcon} />
				<View>
					{sections.map(section => (
						<Text key={section.label}>
							<Text style={styles.sectionData}>{section.label}</Text> {section.value}
						</Text>
					))}
				</View>
			</View>
			<View style={styles.forecastContainer}>
				{/* @todo: Improve UI for this section */}
				<ScrollView>
					{forecast.list.map(item => (
						<View key={item.dt}>
							<Text style={styles.sectionData}>Date: {item.dt_txt}</Text>
							<Text style={styles.sectionData}>Temperature: {convertTemperature(item.main.temp, temperatureUnit)}</Text>
							<Text style={styles.sectionData}>Description: {item.weather[0].description}</Text>
							<Text style={styles.sectionData}>Humidity: {`${item.main.humidity} %`}</Text>
							<Text style={styles.sectionData}>Pressure: {`${item.main.pressure} hPa`}</Text>
							<Text style={styles.sectionData}>Wind Speed: {`${item.wind.speed} meter/sec`}</Text>
						</View>
					))}
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	forecastContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 8,
		width: '100%',
	},
	infoSection: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 8,
		width: '100%',
	},
	sectionData: {
		fontSize: 14,
		fontWeight: 'bold',
		marginVertical: 2,
	},
	unitSelectionButton: {
		borderRadius: 4,
		borderWidth: 1,
		marginRight: 8,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	unitSelectionButtonActive: {
		backgroundColor: '#e3e3e3',
	},
	unitSelectionButtons: {
		flexDirection: 'row',
	},
	unitSelectionContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16,
	},
	unitSelectionText: {
		marginRight: 8,
	},
	weatherContainer: {
		backgroundColor: '#ede0d4',
		borderRadius: 8,
		flex: 1,
		margin: 16,
	},
	weatherIcon: {
		height: 90,
		width: 90,
	},
})
