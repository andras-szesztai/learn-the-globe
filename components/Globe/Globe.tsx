import { useEffect, useRef, useState } from 'react'

import Color from 'color'
import dynamic from 'next/dynamic'

import { TGeoJson } from '../../types/geojson'
const GlobeGl = dynamic(() => import('react-globe.gl'), { ssr: false })

const mainColor = '#e9d8a6'
const accentColor = '#ca6702'
const bgColor = '#001219'

export function Globe() {
	const [geoJson, setGeoJson] = useState<TGeoJson[] | null>(null)
	useEffect(() => {
		if (!geoJson) {
			;(async () => {
				const response = await fetch('api/geojson')
				const data = await response.json()
				setGeoJson(data)
			})()
		}
	}, [geoJson])
	const [hoveredPolygon, setHoveredPolygon] = useState<TGeoJson | null>()
	const [clickedPolygon, setClickedPolygon] = useState<TGeoJson | null>()

	return (
		geoJson && (
			<GlobeGl
				globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
				polygonsData={geoJson}
				animateIn={false}
				polygonStrokeColor={() => bgColor}
				polygonAltitude={(d) => (d === clickedPolygon ? 0.02 : 0.01)}
				polygonCapColor={(d) =>
					d === clickedPolygon ? accentColor : mainColor
				}
				polygonSideColor={() => Color(mainColor).alpha(0.5).rgb().string()}
				polygonsTransitionDuration={250}
				showGraticules
				backgroundColor={bgColor}
				// onPolygonHover={(clicked) => {
				// 	setHoveredPolygon(clicked as TGeoJson)
				// }}
				onPolygonClick={(clicked) => {
					setClickedPolygon(clicked as TGeoJson)
				}}
			/>
		)
	)
}
