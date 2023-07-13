import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RootApp from './app'

// Create a client
const queryClient = new QueryClient()

export default function App() {
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			<SafeAreaView style={styles.container}>
				<RootApp />
			</SafeAreaView>
		</QueryClientProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fafafa',
		flex: 1,
	},
})
