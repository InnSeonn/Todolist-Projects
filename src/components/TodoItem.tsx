import styled, { css } from 'styled-components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import React, { useRef, useState, useEffect } from 'react';
import { Todo, useTodoDispatch, useTodoState } from '../contexts/TodoContext';
import { dateFormatter } from './dateFormatter';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useToggleState } from '../contexts/ToggleContext';
import { useNewTodoState } from '../contexts/NewTodoContext';
import { vibration } from './Header';

//style
export const TodoItemLayout = styled.li`
	position: relative;
	margin-top: 1.5em;
	&.error {
		animation: ${vibration} 0.1s 3;
		textarea {
			color: #f44336;
			&::placeholder {
				color: #f44336;
			}
		}
	}
	@media screen and (min-width: 768px) {
		margin-top: 0.5em;
	}
`;
const TodoItemForm = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	@media screen and (min-width: 768px) {
		flex-wrap: nowrap;
	}
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
const TodoItemTextarea = styled.textarea`
	overflow: hidden;
	flex: 1;
	width: 100%;
	padding: 0.2em;
	border: none;
	color: var(--color-primary-dark);
	font-size: var(--font-size-16);
	font-weight: 510;
	// font-variation-settings: 'wght' 510;
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
	flex: 1;
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
	width: 100%;
	margin-top: 0.2em;
	margin-left: 1.475rem;
	z-index: 1;
	&.focus {
		z-index: 999;
	}
	@media screen and (min-width: 768px) {
		width: 10em;
		margin: 0;
		text-align: right;
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
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 2em;
	height: 100%;
	margin-left: 3em;
	color: var(--color-grey-light);
	&:hover {
		color: var(--color-accent-light);
		transition: color 0.3s;
	}
	svg {
		width: 1.25rem;
		height: 1.25rem;
	}
	@media screen and (min-width: 768px) {
		order: 3;
		margin-left: 1.4em;
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
	const newTodo = useNewTodoState();
	const [windowWidth, setWindowWidth] = useState(0);

	/* 토글 버튼 활성화 체크 */
	useEffect(() => {
		if(isDone && toggle.checked) { //체크된 항목이고, 체크된 항목을 표시하는 경우
			setDisplay(true);
		} else if(isDone && !toggle.checked) { //체크된 항목이고, 체크된 항목을 표시하지 않는 경우
			setDisplay(false);
		} else { //체크되지 않은 항목
			setDisplay(true);
		}
	}, [toggle.checked]);

	/* window resize 이벤트 리스너 등록 */
	useEffect(() => {
		window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
	}, []);

	/* 할 일 텍스트 입력창 높이 설정 */
	useEffect(() => {
		document.fonts.ready.then(() => { //폴백 폰트와 크기 차이로 인해 scrollHeight가 정확하지 않은 문제 해결
			if(textRef.current !== null) {
				textRef.current.style.height = 'auto';
				textRef.current.style.height = textRef.current.scrollHeight + 'px';
			}
		});
	}, [display, windowWidth]);

	/* 새로운 할 일인지 체크 */
	useEffect(() => {
		if(newTodo.isNew === id) {
			textRef.current?.focus();
		} 
	}, [newTodo]);

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

		if(newTodo.isNew === id) {
			newTodo.setIsNew(-1);
		}
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

	/** 엔터 키 입력 체크 */
	function checkKeyDown(e: React.KeyboardEvent) {
		if(e.key !== 'Enter') {
			return ;
		}

		textRef.current?.blur();
		checkEditedText();
	}

	/** 할 일이 수정되었는지 확인 */
	function checkEditedText() {
		if(textRef.current?.value === '' || textRef.current?.value === text) {
			return ;
		} else {
			updateTodoItem();
			if(newTodo.isNew > 0 && newTodo.isNew === id) {
				newTodo.setIsNew(-1);
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
		<TodoItemLayout data-id={id} style={{display: `${display ? 'block' : 'none'}`}}>
			<TodoItemForm action='#'>
				<TodoItemRow className={isDone ? 'checked' : ''}>
					<input type='checkbox' id={`check${id}`} style={{display: 'none'}} checked={isDone} onChange={toggleTodoCheck}/>
					<TodoItemCheckbox htmlFor={`check${id}`}></TodoItemCheckbox>
					<TodoItemTextarea rows={1} placeholder='할 일을 작성해 보세요!' onKeyDown={checkKeyDown} onBlur={checkEditedText} onChange={editTodoText} value={todoText} ref={textRef} readOnly={isDone ? true : false} disabled={isDone ? true : false} spellCheck={false}/>
				</TodoItemRow>
				<TodoItemDeleteButton type='button' onClick={deleteTodoItem}><RiDeleteBin6Line/></TodoItemDeleteButton>
				<TodoDatePickerBox onClick={setZindex}>
					<DatePicker selected={date} onChange={dateChangeHandler} locale={ko} disabledKeyboardNavigation
						customInput={<TodoItemDateButton type='button'>{dateFormatter(date)}</TodoItemDateButton>} disabled={isDone ? true : false}>
					</DatePicker>
				</TodoDatePickerBox>
			</TodoItemForm>
		</TodoItemLayout>
	);
}
