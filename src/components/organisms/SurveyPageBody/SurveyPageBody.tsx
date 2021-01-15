import SurveySection from '@src/components/molecules/SurveySection/SurveySection';
import SurveySectionHeader from '@src/components/molecules/SurveySection/SurveySectionHeader/SurveySectionHeader';
import SurveySectionRating from '@src/components/molecules/SurveySection/SurveySectionRating/SurveySectionRating';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import tw, { styled } from 'twin.macro';

type Props = {};

type FormInputValues = {
	interest: string;
	smoothness: string;
	siv: string;
	vas: string;
	guests: string;
	misc: string;
	favourite: string;
	suggestion: string;
};

function SurveyPageBody({}: Props): ReactElement {
	const { register, handleSubmit } = useForm<FormInputValues>();

	const onSubmit = (data: FormInputValues) => {
		console.log(data);
	};

	return (
		<Container>
			<header>
				<SurveyTitle>
					Feedback
					<br />
					Virtual Orientation
					<br />
					Winter 2021
				</SurveyTitle>
			</header>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<SurveySection>
					<SurveySectionHeader
						data={{
							heading: 'Phần 1',
							descriptions: [
								'Cảm ơn bạn đã tham gia Virtual Orientation - Fall 2020 cùng SIV & VAS team, hy vọng chương trình vừa rồi đã đem lại cho các bạn những thông tin bổ ích và cần thiết về Seneca.',
								'Ban tổ chức (BTC) cũng muốn lắng nghe ý kiến của các bạn về chương trình để rút kinh nghiệm và làm tốt hơn cho lần sau, các bạn vui lòng để lại feedback cho BTC trong form dưới đây nhé!',
							],
						}}
					/>

					<SurveySectionRating
						data={{
							question:
								'Theo bạn, nội dung của Virtual Orientation có thú vị và thích hợp không? *',
							ratingSystem: { inputName: 'interest' },
						}}
						inputRef={register}
					/>
					<SurveySectionRating
						data={{
							question:
								'Cấu trúc của Virtual Orientation - Winter 2021 có trôi chảy và thời gian chương trình hợp lý không? *',
							ratingSystem: { inputName: 'smoothness' },
						}}
						inputRef={register}
					/>
					<SurveySectionRating
						data={{
							question: 'Seneca International Vietnam (SIV) *',
							ratingSystem: { inputName: 'siv' },
						}}
						inputRef={register}
					/>
				</SurveySection>

				<SurveySection>
					<SurveySectionHeader
						data={{
							heading: 'Phần 2',
							descriptions: [
								'Các bạn vui lòng đánh giá từng phần của Orientation dựa trên nội dung, thú vị, sự hữu ích của thông tin.',
							],
						}}
					/>

					<SurveySectionRating
						data={{
							question: 'Vietnamese Association @ Seneca (VAS) *',
							ratingSystem: { inputName: 'vas' },
						}}
						inputRef={register}
					/>
					<SurveySectionRating
						data={{
							question: 'Guest speaker- Career Development *',
							ratingSystem: { inputName: 'guests' },
						}}
						inputRef={register}
					/>
					<SurveySectionRating
						data={{
							question:
								'The HUB/mini break, #StayActive Contest/Testimonials *',
							ratingSystem: { inputName: 'misc' },
						}}
						inputRef={register}
					/>
				</SurveySection>

				<button>Submit</button>
			</Form>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.section<ContainerProps>`
	${tw`text-red-200 font-medium `}
	padding: 3.75rem  15%;
`;

type SurveyTitleProps = {};
const SurveyTitle = styled.h1<SurveyTitleProps>`
	${tw`font-semibold text-center text-7xl leading-none tracking-tightest`}
	${tw`mb-14`}
`;

type FormProps = {};
const Form = styled.form<FormProps>`
	${tw`space-y-24`}
`;

export default SurveyPageBody;
