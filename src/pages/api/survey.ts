import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
export default async function increaseViews(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Only POST allowed' });
	}

	try {
		const pathToFile = path.resolve('.', 'content/survey/orientation.json');

		fs.readFile(pathToFile, (err, data) => {
			if (err) throw err;

			const currentData = JSON.parse(data.toString());

			currentData.push(req.body);

			fs.writeFile(pathToFile, JSON.stringify(currentData), (err) => {
				if (err) throw err;
			});
		});

		return res.status(200).json({ message: 'OK' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Fail to append survey file ' });
	}
}
