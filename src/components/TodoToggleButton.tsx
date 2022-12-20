import styled from 'styled-components';
import { BiCategory } from 'react-icons/bi';
import { MdChecklist } from 'react-icons/md';
import { useToggleDispatch, useToggleState } from '../contexts/ToggleContext';

const ToggleButtonLayout = styled.div`
  padding-bottom: 1em;
`;
const ToggleButton = styled.button`
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
		<ToggleButtonLayout>
			<ToggleButton className='filter' onClick={toggleOption}><BiCategory/></ToggleButton>
			<ToggleButton className='checked on' onClick={toggleOption}><MdChecklist/></ToggleButton>
		</ToggleButtonLayout>
	);
}