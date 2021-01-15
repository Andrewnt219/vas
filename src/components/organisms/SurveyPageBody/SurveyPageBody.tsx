import SurveySection from '@src/components/molecules/SurveySection/SurveySection';
import SurveySectionHeader from '@src/components/molecules/SurveySection/SurveySectionHeader/SurveySectionHeader';
import SurveySectionRating from '@src/components/molecules/SurveySection/SurveySectionRating/SurveySectionRating';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

function SurveyPageBody({}: Props): ReactElement {
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

			<main>
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

					<SurveySectionRating data={{ question: 'Hi' }} />
					<SurveySectionRating data={{ question: 'Hello' }} />
					<SurveySectionRating data={{ question: 'Bonjour' }} />
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

					<SurveySectionRating data={{ question: 'Xin Chao' }} />
					<SurveySectionRating data={{ question: 'Heu lo' }} />
					<SurveySectionRating data={{ question: 'Chao' }} />
				</SurveySection>
			</main>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.section<ContainerProps>`
	${tw`text-red-200 font-medium`}
	padding: 0 15%;
`;

type SurveyTitleProps = {};
const SurveyTitle = styled.h1<SurveyTitleProps>`
	${tw`font-semibold text-center text-7xl leading-none tracking-tightest`}
	${tw`mb-14`}
`;

export default SurveyPageBody;
