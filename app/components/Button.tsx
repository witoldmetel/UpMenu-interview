import React from 'react'
import { Pressable, Text, Platform, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native'

import { getButtonStyle } from '../utils'

interface ButtonProps {
	text?: string
	children?: React.ReactNode
	variant?: 'text' | 'contained' | 'outlined'
	disabled?: boolean
	loading?: boolean
	style?: StyleProp<ViewStyle>

	onPress: VoidFunction
}

export function Button({ onPress, text, children, variant = 'text', disabled, loading, style }: ButtonProps) {
	const { buttonStyle, textStyle } = getButtonStyle(variant, disabled)

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				buttonStyle,
				variant !== 'text' && styles.shadowStyle,
				{
					opacity: pressed ? 0.6 : 1,
					justifyContent: children ? 'space-between' : 'center',
				},
				style,
			]}
			onPress={onPress}
			disabled={disabled}
			testID="button">
			{loading ? (
				<ActivityIndicator size="small" color={textStyle.color} testID="loading-indicator" />
			) : (
				children ?? <Text style={textStyle}>{text}</Text>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		borderRadius: 8,
		flexDirection: 'row',
		height: 56,
		marginVertical: 8,
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	shadowStyle: {
		...Platform.select({
			ios: {
				shadowColor: '#171717',
				shadowOffset: { width: -2, height: 4 },
				shadowOpacity: 0.2,
				shadowRadius: 3,
			},
			android: {
				elevation: 4,
				shadowColor: '#171717',
			},
			default: {
				// other platforms, web for example
				shadowColor: '#171717',
				shadowOffset: { width: -2, height: 4 },
				shadowOpacity: 0.2,
				shadowRadius: 3,
			},
		}),
	},
})
