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
	const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto'});
	const daysPassed = getDaysPassed(selectedDate);

	let formatted = '';
	if(Math.abs(daysPassed) > 7) { //7일 전(후)부터는 날짜로 표시
		const selectedYear = selectedDate.getFullYear();
		const year = today.year === selectedYear ? '' : selectedYear.toString().substring(2, 4) + '년 '; //올해는 연도 생략
		formatted = `${year}${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
	} else {
		formatted = formatter.format(daysPassed, 'day');
	}

	return formatted;
}