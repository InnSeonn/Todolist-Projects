import styled from 'styled-components';
import { GoPlus } from 'react-icons/go';

const Button = styled.button`
  position: absolute;
  bottom: 0;
  left: 50%;
  display: flex;
  align-items: center;
  padding: 0.8em 2em;
  border-radius: 2rem;
  background-color: var(--color-primary);
  color: #fff;
  font-size: var(--font-size-16);
  font-weight: 600;
  transform: translate(-50%, 50%);
  svg {
    margin-left: 0.5em;
  }
`;

export default function AddButton() {
	return (
		<Button type='button'>ADD NEW <GoPlus/></Button>
	);
}