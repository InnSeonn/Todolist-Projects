import styled from 'styled-components';
import { useRef, useState } from 'react';

const HeaderLayout = styled.header`
	max-width: var(--max-width);
	width: 100%;
	padding-bottom: 1em;
	text-align: center;
`;
const HeaderForm = styled.form`
	background-color: var(--color-primary);
`;
const HeaderInput = styled.input`
	max-width: 300px;
	padding: 0.8em;
	color: #fff;
	font-size: var(--font-size-18);
	font-weight: 600;
	text-align: center;
	&::placeholder {
		color: #fff;
		opacity: 0.5;
	}
`;

function getTitle(): string {
	if(window.localStorage.getItem('todoTitle')) {
		return String(window.localStorage.getItem('todoTitle'));
	} else {
		return '';
	}
}

export default function Header() {
	const textRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState<string>(getTitle());

	function editTitle() {
		if(textRef.current !== null) {
			setTitle(textRef.current.value);
		}
	}

	function updateTitle(e: React.FormEvent | React.FocusEvent) {
		e.preventDefault();
		if(textRef.current !== null) {
			window.localStorage.setItem('todoTitle', textRef.current.value);
		}
	}

	function checkKeyDown(e: React.KeyboardEvent) {
		if(e.key === 'Enter' && e.currentTarget instanceof HTMLInputElement) {
			e.currentTarget.blur();
		}
	}

	return (
		<HeaderLayout className='header'>
			<HeaderForm action='#' onSubmit={updateTitle}>
				<HeaderInput type='text' placeholder='2022년 12월에 해야 할 일들' maxLength={15} ref={textRef} onChange={editTitle} onBlur={updateTitle} value={title} onKeyDown={checkKeyDown}/>
			</HeaderForm>
		</HeaderLayout>
	);
}