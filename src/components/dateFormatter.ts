const todayDate = new Date();
export const today = {
	year: todayDate.getFullYear(),
	month: todayDate.getMonth(),
	date: todayDate.getDate(),
	getToday() {
		return new Date(this.year, this.month, this.date, 0, 0, 0);
	}
}

export function getDaysPassed(date: Date) {
	return Math.floor((date.getTime() - today.getToday().getTime()) / (1000 * 60 * 60 * 24));
}

export function dateFormatter(selectedDate: Date): string {
	const timeFormatter = new Intl.DateTimeFormat('ko', { dateStyle: 'long'});
	const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto'});
	const daysPassed = getDaysPassed(selectedDate);

	if(Math.abs(daysPassed) > 7) { //7일 전(후)부터는 날짜로 표시
		const selectedYear = selectedDate.getFullYear();
		return today.year === selectedYear ? timeFormatter.format(selectedDate).substring(6) : timeFormatter.format(selectedDate);
	} else {
		return formatter.format(daysPassed, 'day');
	}
}