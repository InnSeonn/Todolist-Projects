import styled from 'styled-components';
import { BiCategory } from 'react-icons/bi';
import { MdChecklist } from 'react-icons/md';
import { useToggleDispatch, useToggleState } from '../contexts/ToggleContext';

const Button = styled.button`
  margin-right: 1em;
  color: var(--color-primary-dark);
  font-size: var(--font-size-16);
  opacity: 0.5;
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  &.on {
    opacity: 1;
  }
`;

export default function TodoToggleButton() {
	const isShowCheckedItem = useToggleState();
	const dispatch = useToggleDispatch();

	function toggleShowCheckedItem(e: React.MouseEvent) {
    const toggleBtn = e.currentTarget;
    toggleBtn.classList.toggle('on');
		dispatch(!isShowCheckedItem);
  }

	return (
		<div>
			<Button className='filterBtn'><BiCategory/></Button>
			<Button className='showCheckedBtn on' onClick={toggleShowCheckedItem}><MdChecklist/></Button>
		</div>
	);
}