import { ImageModel } from './ImageModel';

export type MemberModel = {
	title: string;
	position: string;
	contact: {
		linkedIn?: string;
		facebook?: string;
	};
	isActive: boolean;
	avatar: ImageModel;
};
