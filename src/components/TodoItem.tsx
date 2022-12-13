import styled, { css } from 'styled-components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import React, { useRef, useState, useEffect } from 'react';
import { Todo, useTodoDispatch, useTodoState } from '../contexts/TodoContext';
import { dateFormatter } from './dateFormatter';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useToggleState } from '../contexts/ToggleContext';

//style
const TodoItemLayout = styled.li`
position: relative;
margin: 0.5em 0;
`;
const TodoItemCheckbox = styled.label`
display: block;
width: 0.875rem;
height: 0.875rem;
margin-right: 0.5rem;
border-radius: 50%;
border: 1px solid var(--color-grey-light);
cursor: pointer;
&:hover {
	background-color: var(--color-primary);
	transition: background-color 0.3s;
}
`;
const TodoItemInput = styled.input`
min-width: 320px;
padding: 0.2em;
color: var(--color-primary-dark);
font-size: var(--font-size-16);
font-weight: 500;
&::placeholder {
	color: var(--color-grey-light);
}
`;
const TodoItemTextarea = styled.textarea`
overflow: hidden;
max-width: 16.875rem;
width: 100%;
padding: 0.2em;
border: none;
color: var(--color-primary-dark);
font-size: var(--font-size-16);
font-variation-settings: 'wght' 510;
line-height: 1.5;
word-break: break-all;
resize: none;
&::placeholder {
	color: var(--color-grey-light);
}
&:focus {
	border-bottom: 2px solid var(--color-bg);
	outline: none;
}
&:disabled {
	background: none;
}
`;
const TodoItemRow = styled.div`
position: relative;
display: flex;
align-items: center;
&.checked {
	opacity: 0.3;
	${TodoItemCheckbox} {
		border-color: var(--color-primary);
		background-color: var(--color-primary);
	}
	${TodoItemTextarea} {
		text-decoration-line: line-through;
	}
}
`;
const TodoDatePickerBox = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
	height: 100%;
	transform: translateX(-2.5em);
	z-index: 1;
	&.focus {
		z-index: 999;
	}

	.react-datepicker {
		border-color: var(--color-grey-light);
		font-family: 'Pretendard';
	
		&__header {
			border: none;
			background-color: #fff;
			font-size: var(--font-size-16);
		}
	
		&__day {
			margin: 0.5em;
			&-name {
				margin: 0.5em;
			}
			&--today {
				color: var(--color-accent);
			}
			&--selected {
				background-color: var(--color-primary);
				color: #fff;
			}
		}
	
		&__current-month {
			padding: 0.5em 0;
			font-size: var(--font-size-16);
		}
	
		&__month {
			margin: 1em;
			margin-top: 0.4em;
			font-size: var(--font-size-16);
		}
	
		&__navigation {
			top: 10px;
			&-icon::before {
				border-width: 2px 2px 0 0;
				width: 6px;
				height: 6px;
			}
		}
	
		&-popper {
			// z-index: 999 !important;
			.react-datepicker__triangle::after {
				border-bottom-color: #fff;
			}
			.react-datepicker__triangle::before {
				border-bottom-color: var(--color-grey-light);
			}
		}
	}
`;
const TodoItemDateButton = styled.button`
	color: var(--color-grey-light);
	font-size: var(--font-size-14);
	cursor: auto;
	
	&:hover {
		${(props) => props.disabled === false && css`
			color: var(--color-primary-dark);
			transition: color 0.3s;
			cursor: pointer;
		`}
	}
`;
const TodoItemDeleteButton = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	color: var(--color-grey-light);
	display: flex;
	align-items: center;
	&:hover {
		color: var(--color-accent-light);
		transition: color 0.3s;
}
svg {
	width: 1.25rem;
	height: 1.25rem;
}
`;

//ts
type TodoProps = {
	todo :Todo;
};

export default function TodoItem({ todo }: TodoProps) { 
	const todos = useTodoState();
	const myTodo = todos.find(v => v.id === todo.id) || todo;
	const { id, isDone, text, date } = myTodo;
	const dispatch = useTodoDispatch();
	const textRef = useRef<HTMLTextAreaElement>(null);
	const [todoText, setTodoText] = useState(text);
	const toggle = useToggleState();
	const [display, setDisplay] = useState(toggle.checked);

	useEffect(() => {
		if(isDone && toggle.checked) { //체크된 항목이고, 체크된 항목을 표시하는 경우
			setDisplay(true);
		} else if(isDone && !toggle.checked) { //체크된 항목이고, 체크된 항목을 표시하지 않는 경우
			setDisplay(false);
		} else { //체크되지 않은 항목
			setDisplay(true);
		}
	}, [toggle.checked]);

	useEffect(() => {
		document.fonts.ready.then(() => { //폴백 폰트와 크기 차이로 인해 scrollHeight가 정확하지 않은 문제 해결
			if(textRef.current !== null) {
				textRef.current.style.height = 'auto';
				textRef.current.style.height = textRef.current.scrollHeight + 'px';
			}
		});
	}, []);

	/** 투두 전역 상태 업데이트 */
	function updateTodoItem(myDate?: Date) {
		dispatch({
			type: 'UPDATE',
			id: id,
			text: todoText || '',
			date: myDate || date,
		});
	}

	/** 투두 아이템 삭제 */
	function deleteTodoItem() {
		dispatch({
			type: 'DELETE',
			id: todo.id,
		});
	}

	/** 체크 박스 토글 */
	function toggleTodoCheck(e: React.ChangeEvent) {
		dispatch({
			type: 'TOGGLE',
			id: todo.id,
		});
	}

	/** 텍스트 수정 */
	function editTodoText(e: React.ChangeEvent) {
		if(e.target instanceof HTMLTextAreaElement) {
			//입력된 텍스트에 따라 높이값 변경
			e.target.style.height = 'auto';
			e.target.style.height = e.target.scrollHeight + 'px';
			setTodoText(e.target.value);
		}
	}

	/** 날짜 변경 */
	function dateChangeHandler(date: Date) {
		updateTodoItem(date);
	}

	function checkKeyDown(e: React.KeyboardEvent) {
		if(e.key === 'Enter') {
			updateTodoItem();
			if(e.currentTarget instanceof HTMLTextAreaElement) {
				e.currentTarget.blur();
			}
		}
	}

	/** DatePicker 최상단 레이어에 표시하기 */
	function setZindex(e: React.MouseEvent) {
		const boxes = document.querySelectorAll(TodoDatePickerBox) as NodeListOf<HTMLElement>;
		Array.from(boxes).find(box => box.classList.contains('focus'))?.classList.remove('focus');
		const elem = e.currentTarget as HTMLElement;
		elem.classList.add('focus');
	}

	return (
		<TodoItemLayout style={{display: `${display ? 'block' : 'none'}`}}>
			<form action='#'>
				<TodoItemRow className={isDone ? 'checked' : ''}>
					<input type='checkbox' id={`check${id}`} style={{display: 'none'}} checked={isDone} onChange={toggleTodoCheck}/>
					<TodoItemCheckbox htmlFor={`check${id}`}></TodoItemCheckbox>
					<TodoItemTextarea rows={1} placeholder='할 일을 작성해 보세요!' onKeyDown={checkKeyDown} onBlur={() => updateTodoItem()} onChange={editTodoText} value={todoText} ref={textRef} readOnly={isDone ? true : false} disabled={isDone ? true : false}/>
				</TodoItemRow>
				<TodoDatePickerBox onClick={setZindex}>
					<DatePicker selected={date} onChange={dateChangeHandler} locale={ko} disabledKeyboardNavigation
						customInput={<TodoItemDateButton type='button'>{dateFormatter(date)}</TodoItemDateButton>} disabled={isDone ? true : false}>
					</DatePicker>
				</TodoDatePickerBox>
				<TodoItemDeleteButton type='button' onClick={deleteTodoItem}><RiDeleteBin6Line/></TodoItemDeleteButton>
			</form>
		</TodoItemLayout>
	);
}
