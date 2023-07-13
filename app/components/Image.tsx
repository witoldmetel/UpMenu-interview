import React from 'react'
import { Image as ExpoImage, type ImageContentFit, type ImageContentPosition, type ImageStyle } from 'expo-image'

const getImage = (icon: string) => `https://openweathermap.org/img/w/${icon}.png`

type ImageProps = {
	icon: string
	contentFit?: ImageContentFit
	contentPosition?: ImageContentPosition
	style?: ImageStyle
}

export const Image = ({ icon, contentFit = 'cover', contentPosition, style }: ImageProps) => {
	return (
		<ExpoImage
			style={style}
			source={getImage(icon)}
			contentFit={contentFit}
			contentPosition={contentPosition ?? 'center'}
			transition={500}
		/>
	)
}
