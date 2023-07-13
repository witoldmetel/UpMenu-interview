import { useQueries } from '@tanstack/react-query'

import { getForecast, getWeather } from '../api'
import { WeatherDataType } from '../types'

type useWeatherReturnType = {
	data: WeatherDataType
	weatherStatus: 'error' | 'success' | 'loading'
	forecastStatus: 'error' | 'success' | 'loading'
	weatherError: unknown
	forecastError: unknown
	refetch: () => void
}

export const useWeather = ({ searchQuery }: { searchQuery?: string }): useWeatherReturnType => {
	const [weatherQuery, forecastQuery] = useQueries({
		queries: [
			{
				queryKey: ['weather'],
				queryFn: () => getWeather(searchQuery),
				refetchOnWindowFocus: false,
				enabled: false,
			},
			{
				queryKey: ['forecast'],
				queryFn: () => getForecast(searchQuery),
				refetchOnWindowFocus: false,
				enabled: false,
			},
		],
	})

	const fetchData = () => {
		weatherQuery.refetch()
		forecastQuery.refetch()
	}

	return {
		data: {
			weather: { ...weatherQuery.data },
			forecast: { ...forecastQuery.data },
		},
		weatherStatus: weatherQuery.status,
		weatherError: weatherQuery.error,
		forecastStatus: forecastQuery.status,
		forecastError: forecastQuery.error,
		refetch: fetchData,
	}
}
