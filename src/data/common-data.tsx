export enum Semester {
	WINTER = 'Winter Semester',
	FALL = 'Fall Semester',
	SUMMER = 'Summer Semester',
	_INVALID = '--',

	FALL_END_MONTH = 12,
	WINTER_END_MONTH = 4,
	SUMMER_END_MONTH = 8,
}

export enum Format {
	SHORT_DATE = 'MM-DD',
	SHORT_TEXT_DATE = 'MMM DD',
	DATE = 'YYYY-MM-DD',
	DATE_TIME = 'YYYY-MM-DD HH:mm',
	DATE_TEXT = 'MMMM DD, YYYY',
}
