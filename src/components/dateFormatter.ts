export function getDaysPassed(date: Date) {
	return Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
}

export function dateFormatter(selectedDate: Date): string {
	const formatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto'});
	const today = new Date();
	const daysPassed = getDaysPassed(selectedDate);

	let formatted = '';
	if(Math.abs(daysPassed) > 7) { //7일 전(후)부터는 날짜로 표시
		const year = today.getFullYear() === selectedDate.getFullYear() ? '' : selectedDate.getFullYear().toString().substring(2, 4) + '년 '; //올해는 연도 생략
		formatted = `${year}${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
	} else {
		formatted = formatter.format(daysPassed, 'day');
	}

	return formatted;
}