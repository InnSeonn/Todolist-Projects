import styled, { keyframes } from 'styled-components';
import { useRef, useState } from 'react';

const HeaderLayout = styled.header`
	max-width: var(--max-width);
	width: 100%;
	text-align: center;
`;
const HeaderForm = styled.form`
	background-color: var(--color-primary);
`;
const vibration = keyframes`
	0% {
		transform: rotate(1deg);
	}
	100% {
		tranform: rotate(-1deg);
	}
`;
const HeaderInput = styled.input`
	width: 100%;
	padding: 0.8em;
	color: #fff;
	font-size: var(--font-size-16);
	font-weight: 600;
	text-align: center;
	&::placeholder {
		color: #fff;
		opacity: 0.5;
	}
	&.error {
		color: #f44336;
		animation: ${vibration} 0.1s 3;
	}
`;

function getTitle(): string {
	if(window.localStorage.getItem('todoTitle')) {
		return String(window.localStorage.getItem('todoTitle'));
	} else {
		return '';
	}
}
const MAXLENGHT = 25;

export default function Header() {
	const textRef = useRef<HTMLInputElement>(null);
	const [title, setTitle] = useState<string>(getTitle());

	function editTitle() {
		if(textRef.current !== null) {
			//제목이 25자가 넘어가면 에러 표시
			if(textRef.current.value.length >= MAXLENGHT) {
				textRef.current.classList.add('error');
				setTimeout(() => textRef.current?.classList.remove('error'), 300);
				return ;
			}
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
				<HeaderInput type='text' placeholder='할 일을 미루지 말자' maxLength={MAXLENGHT} ref={textRef} onChange={editTitle} onBlur={updateTitle} onKeyDown={checkKeyDown} value={title} spellCheck={false}/>
			</HeaderForm>
		</HeaderLayout>
	);
}