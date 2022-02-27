export type TGeoJson = {
	type: string
	geometry: {
		type: string
		coordinates: number[][][]
	}
	properties: {
		ADMIN: string
		ISO_A3: string
	}
}
