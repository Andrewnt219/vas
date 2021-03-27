import { Result } from '@api-response';
import sanityClient from '@sanity/client';
import { apiHanler } from '@src/server/utils/api-utils';
import { NextApiHandler } from 'next';

const client = sanityClient({
	projectId: process.env.SANITY_CLIENT_ID as string,
	dataset: 'production',
	// Need a write token in order to read schedule metadata and publish documents
	token: process.env.SANITY_PUBLISHING_CRON as string,
	useCdn: false,
});

// Query for any scheduled publish events that should occur
const query = `* [_type == "schedule.metadata" && !(_id in path("drafts.**")) && datetime <= now()]`;

const publish = async (metadata: any, client: any) => {
	const dataset = client.config().dataset;
	const id = metadata.documentId;
	const rev = metadata.rev;

	// Fetch the draft revision we should publish from the History API
	const uri = `/data/history/${dataset}/documents/drafts.${id}?revision=${rev}`;
	const revision = await client
		.request({ uri })
		.then(
			(response: any) => response.documents.length && response.documents[0]
		);

	if (!revision) {
		// Here we have a situation where the scheduled revision does not exist
		// This can happen if the document was deleted via Studio or API without
		// unscheduling it first.
		console.error('Could not find document revision to publish', metadata);
		return;
	}

	// Publish it
	return (
		client
			.transaction()
			// Publishing a document is simply writing it to the dataset without a
			// `drafts.` prefix. The `documentId` field on the metadata already does
			// not include this prefix, but the revision we fetched probably does, so
			// we overwrite it here.
			.createOrReplace(Object.assign({}, revision, { _id: id }))
			// Then we delete any current draft.
			.delete(`drafts.${id}`)
			// And finally we delete the schedule medadata, since we're done with it.
			.delete(metadata._id)
			.commit()
	);
};

const get: NextApiHandler<Result<string>> = async (req, res) => {
	const response = await client.fetch(query);
	await Promise.all(response.map((metadata: any) => publish(metadata, client)));

	res.setHeader('Access-Control-Allow-Origin', '*');

	res.status(200).json({
		data: 'OK',
		error: null,
	});
};

export default apiHanler({ get });
