import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

function SurveySectionHeader({}: Props): ReactElement {
	return (
		<Header>
			<Heading>Phần 1</Heading>

			<DescriptionContainer>
				<Description>
					Cảm ơn bạn đã tham gia Virtual Orientation - Fall 2020 cùng SIV & VAS
					team, hy vọng chương trình vừa rồi đã đem lại cho các bạn những thông
					tin bổ ích và cần thiết về Seneca.
				</Description>

				<Description>
					Ban tổ chức (BTC) cũng muốn lắng nghe ý kiến của các bạn về chương
					trình để rút kinh nghiệm và làm tốt hơn cho lần sau, các bạn vui lòng
					để lại feedback cho BTC trong form dưới đây nhé!
				</Description>
			</DescriptionContainer>
		</Header>
	);
}

type HeaderProps = {};
const Header = styled.header<HeaderProps>``;

type HeadingProps = {};
const Heading = styled.h2<HeadingProps>``;

type DescriptionContainerProps = {};
const DescriptionContainer = styled.div<DescriptionContainerProps>``;

type DescriptionProps = {};
const Description = styled.p<DescriptionProps>``;

export default SurveySectionHeader;
