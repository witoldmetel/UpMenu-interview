import React, { useState } from 'react'
import { Text, StyleSheet, TextInput, View, SafeAreaView } from 'react-native'
import { Button } from './components/Button'

import { useWeather } from './hooks/useWeather'
import { WeatherCard } from './components/WeatherCard'
import { isWeatherResponseCorrect, isForecastResponseCorrect } from './utils'

export default function RootApp() {
	const [searchQuery, setSearchQuery] = useState('')
	const { data, weatherStatus, forecastStatus, weatherError, forecastError, refetch } = useWeather({
		searchQuery,
	})

	const handleSearchQueryChange = (text: string) => setSearchQuery(text)

	return (
		<SafeAreaView style={styles.rootContainer}>
			<View style={styles.container}>
				<Text style={styles.title}>Weather App</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter the city name"
					value={searchQuery}
					onChangeText={handleSearchQueryChange}
					clearButtonMode="always"
					editable
				/>
				{weatherStatus === 'error' || forecastStatus === 'error' ? (
					<Text style={styles.errorMessage}>{(weatherError as string) || (forecastError as string)}</Text>
				) : null}
				<Button
					text="Search"
					variant="contained"
					disabled={!searchQuery}
					onPress={refetch}
					style={styles.searchButton}
				/>
				{!isWeatherResponseCorrect(data.weather) && (
					<Text style={styles.errorMessage}>{data.weather?.errorMessage}</Text>
				)}
				{!isForecastResponseCorrect(data.forecast) && (
					<Text style={styles.errorMessage}>{data.forecast?.errorMessage}</Text>
				)}
				{weatherStatus === 'success' &&
				forecastStatus === 'success' &&
				isWeatherResponseCorrect(data.weather) &&
				isForecastResponseCorrect(data.forecast) ? (
					<WeatherCard weather={data.weather} forecast={data.forecast} />
				) : null}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		padding: 16,
	},
	errorMessage: {
		color: '#bd2c00',
		marginVertical: 8,
	},
	input: {
		borderColor: '#333',
		borderWidth: 2,
		height: 40,
		marginBottom: 16,
		paddingHorizontal: 8,
		width: '100%',
	},
	rootContainer: {
		flex: 1,
	},
	searchButton: {
		height: 45,
		width: 150,
	},
	title: {
		color: '#333',
		fontSize: 28,
		marginBottom: 8,
	},
})
