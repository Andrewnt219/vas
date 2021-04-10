import { Format, Semester } from '@data/common-data';
import dayjs from 'dayjs';
import React from 'react';

type Props = { className?: string; date: Date };
function PublishedDate({ className, date }: Props) {
	return (
		<div
			className={className}
			tw="relative pl-5 before:(content absolute top-0 left-0 h-full w-1 block bg-primary)"
		>
			<time dateTime={dayjs(date).format(Format.DATE_TEXT)}>
				{dayjs(date).format(Format.DATE_TEXT)}
			</time>
			<p>{determineSemester(date)}</p>
		</div>
	);
}

function determineSemester(date: Date): Semester {
	if (isNaN(date.valueOf())) {
		return Semester._INVALID;
	}

	if (date.getMonth() < Semester.WINTER_END_MONTH) {
		return Semester.WINTER;
	}

	if (date.getMonth() < Semester.SUMMER_END_MONTH) {
		return Semester.SUMMER;
	}

	return Semester.FALL;
}
export default PublishedDate;
