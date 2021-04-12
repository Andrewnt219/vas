import { SliceComponentProps } from '@prismic-slices';
import { RichTextBlock } from 'prismic-reactjs';
import AboutUsDefaultSection from './AboutUsDefaultSection/AboutUsDefaultSection';
import AboutUsMemberSectionSlice from './AboutUsMemberSectionSlice/AboutUsMemberSectionSlice';
import AboutUsMissionSection from './AboutUsMissionSection/AboutUsMissionSection';

type SliceProps = {
	slice_type: 'section';
	slice_label: 'member_section' | 'mission_section' | null;
	items: unknown[];
	primary: {
		title: RichTextBlock[];
		subtitle: RichTextBlock[];
		description: RichTextBlock[];
	};
};
export type AboutUsSectionSliceProps = SliceComponentProps<SliceProps>;

function AboutUsSectionSlice(props: AboutUsSectionSliceProps) {
	switch (props.slice.slice_label) {
		case 'member_section':
			return <AboutUsMemberSectionSlice {...props} />;

		case 'mission_section':
			return <AboutUsMissionSection {...props} />;

		default:
			return <AboutUsDefaultSection {...props} />;
	}
}

export default AboutUsSectionSlice;
