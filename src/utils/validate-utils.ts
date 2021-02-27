import { languages, Languages } from '@src/data/localization-data';
import { AssertionError } from 'assert';

export function assertLanguages(obj: any): asserts obj is Languages {
	if (!languages.includes(obj)) {
		throw new AssertionError({
			message: 'Not included in available langauges',
		});
	}
}
