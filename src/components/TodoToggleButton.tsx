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
	const toggle = useToggleState();
	const dispatch = useToggleDispatch();

	function toggleShowChecked(e: React.MouseEvent) {
    const toggleBtn = e.currentTarget;
    toggleBtn.classList.toggle('on');
		dispatch({
      type: 'CHECKED',
      toggle: !toggle.checked,
    });
  }

  function toggleFilter(e: React.MouseEvent) {
    const toggleBtn = e.currentTarget;
    toggleBtn.classList.toggle('on');
		dispatch({
      type: 'FILTER',
      toggle: !toggle.filter,
    });
  }

  function toggleOption(e: React.MouseEvent) {
    const toggleBtn = e.currentTarget;
    toggleBtn.classList.toggle('on');
    if(toggleBtn.classList.contains('filter')) {
      dispatch({
        type: 'FILTER',
        toggle: !toggle.filter,
      });
    } else if(toggleBtn.classList.contains('checked')) {
      dispatch({
        type: 'CHECKED',
        toggle: !toggle.checked,
      });
    }
  }

	return (
		<div>
			<Button className='filter on' onClick={toggleOption}><BiCategory/></Button>
			<Button className='checked on' onClick={toggleOption}><MdChecklist/></Button>
		</div>
	);
}