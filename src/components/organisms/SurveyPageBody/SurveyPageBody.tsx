import SurveyRatingInputSet from '@components/molecules/SurveySection/SurveyRatingInputSet/SurveyRatingInputSet';
import SurveyButton from '@src/components/atoms/SurveyButton/SurveyButton';
import SurveyErrorMessage from '@src/components/atoms/SurveyErrorMessage/SurveyErrorMessage';
import SurveySectionAnswerInput from '@src/components/atoms/SurveySectionAnswerInput/SurveySectionAnswerInput';
import SurveySectionQuestion from '@src/components/atoms/SurveySectionQuestion/SurveySectionQuestion';
import SurveySection from '@src/components/molecules/SurveySection/SurveySection';
import SurveySectionHeader from '@src/components/molecules/SurveySection/SurveySectionHeader/SurveySectionHeader';
import SurveySectionQuestionGroup from '@src/components/molecules/SurveySection/SurveySectionQuestionGroup/SurveySectionQuestionGroup';
import { SurveyFsModel } from '@src/model/firebase/SurveyModel';
import { FireStoreDataService } from '@src/services/firestore-data-service';
import { AnimatePresence } from 'framer-motion';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import tw, { styled, theme } from 'twin.macro';

type FormValues = Omit<SurveyFsModel, '_submitedAt'>;
type Props = {
	onFormSubmitted?: (data: SurveyFsModel) => void;
};

function SurveyPageBody({ onFormSubmitted }: Props): ReactElement {
	const { register, handleSubmit, errors } = useForm<FormValues>();

	const onSubmit = (data: FormValues) => {
		const submittedData: SurveyFsModel = {
			...data,
			_submittedAt: new Date().toString(),
		};

		FireStoreDataService.getInstance().then((fs) =>
			fs.addOrientationSurvey(submittedData)
		);

		onFormSubmitted && onFormSubmitted(submittedData);
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

					<SurveySectionQuestionGroup>
						<SurveySectionQuestion>
							Theo bạn, nội dung của Virtual Orientation có thú vị và thích hợp
							không? *
						</SurveySectionQuestion>

						<SurveyRatingInputSet
							data={{
								ratingSystem: { inputName: 'interest' },
								errorMessage: errors['interest']?.message,
							}}
							inputRef={register({
								required: {
									message: 'Bạn cần điền ô này',
									value: true,
								},
							})}
						/>
					</SurveySectionQuestionGroup>

					<SurveySectionQuestionGroup>
						<SurveySectionQuestion>
							Cấu trúc của Virtual Orientation - Winter 2021 có trôi chảy và
							thời gian chương trình hợp lý không? *
						</SurveySectionQuestion>

						<SurveyRatingInputSet
							data={{
								ratingSystem: { inputName: 'smoothness' },
								errorMessage: errors['smoothness']?.message,
							}}
							inputRef={register({
								required: {
									message: 'Bạn cần điền ô này',
									value: true,
								},
							})}
						/>
					</SurveySectionQuestionGroup>

					<SurveySectionQuestionGroup>
						<SurveySectionQuestion>
							Seneca International Vietnam (SIV) *
						</SurveySectionQuestion>

						<SurveyRatingInputSet
							data={{
								ratingSystem: { inputName: 'siv' },
								errorMessage: errors['siv']?.message,
							}}
							inputRef={register({
								required: {
									message: 'Bạn cần điền ô này',
									value: true,
								},
							})}
						/>
					</SurveySectionQuestionGroup>
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

					<SurveySectionQuestionGroup>
						<SurveySectionQuestion>
							Vietnamese Association @ Seneca (VAS) *
						</SurveySectionQuestion>

						<SurveyRatingInputSet
							data={{
								ratingSystem: { inputName: 'vas' },
								errorMessage: errors['vas']?.message,
							}}
							inputRef={register({
								required: {
									message: 'Bạn cần điền ô này',
									value: true,
								},
							})}
						/>
					</SurveySectionQuestionGroup>

					<SurveySectionQuestionGroup>
						<SurveySectionQuestion>
							Guest speaker- Career Development *
						</SurveySectionQuestion>

						<SurveyRatingInputSet
							data={{
								ratingSystem: { inputName: 'guests' },
								errorMessage: errors['guests']?.message,
							}}
							inputRef={register({
								required: {
									message: 'Bạn cần điền ô này',
									value: true,
								},
							})}
						/>
					</SurveySectionQuestionGroup>

					<SurveySectionQuestionGroup>
						<SurveySectionQuestion>
							The HUB/mini break, #StayActive Contest/Testimonials *
						</SurveySectionQuestion>

						<SurveyRatingInputSet
							data={{
								ratingSystem: { inputName: 'misc' },
								errorMessage: errors['misc']?.message,
							}}
							inputRef={register({
								required: {
									message: 'Bạn cần điền ô này',
									value: true,
								},
							})}
						/>
					</SurveySectionQuestionGroup>

					<SurveySectionQuestionGroup>
						<SurveySectionQuestion>
							Trong 4 sections ở trên, phần yêu thích nhất của bạn là: *
						</SurveySectionQuestion>

						<AnimatePresence>
							{errors['favourite'] && (
								<SurveyErrorMessage>
									{errors['favourite'].message}
								</SurveyErrorMessage>
							)}
						</AnimatePresence>

						<SurveySectionAnswerInput
							ref={register({
								required: {
									message: 'Bạn cần điền ô này',
									value: true,
								},
							})}
							type="text"
							name="favourite"
							placeholder="Văn bản câu trả lời ngắn"
						/>
					</SurveySectionQuestionGroup>
					<SurveySectionQuestionGroup>
						<SurveySectionQuestion>
							Bạn có những góp ý gì về Virtual Orientation hoặc suggestions cho
							những sự kiện trong tương lai? *
						</SurveySectionQuestion>

						<AnimatePresence>
							{errors['suggestion'] && (
								<SurveyErrorMessage key="suggestion">
									{errors['suggestion'].message}
								</SurveyErrorMessage>
							)}
						</AnimatePresence>

						<SurveySectionAnswerInput
							ref={register({
								required: {
									message: 'Bạn cần điền ô này',
									value: true,
								},
							})}
							type="text"
							name="suggestion"
							placeholder="Văn bản câu trả lời ngắn"
						/>
					</SurveySectionQuestionGroup>
				</SurveySection>

				<SurveyButton>Submit</SurveyButton>
			</Form>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.section<ContainerProps>`
	${tw`text-red-200 font-medium `}
	padding: 3.75rem  5%;

	@media screen and (min-width: ${theme`screens.sm`}) {
		padding: 3.75rem 15%;
	}
`;

type SurveyTitleProps = {};
const SurveyTitle = styled.h1<SurveyTitleProps>`
	${tw`font-semibold text-center text-5xl sm:text-7xl leading-none tracking-tightest`}
	${tw`mb-14`}
`;

type FormProps = {};
const Form = styled.form<FormProps>`
	${tw`space-y-24`}
	${tw`flex flex-col items-center`}
`;

export default SurveyPageBody;
