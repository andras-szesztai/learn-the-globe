// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TGeoJson } from '../../types/geojson'

import data from './countries.json'

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<TGeoJson[]>
) {
	res.status(200).json((data as any).features)
}
