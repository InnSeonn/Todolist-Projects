import styled from 'styled-components';

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

export default function Header() {
	return (
		<HeaderLayout className='header'>
			<HeaderForm action='#'>
				<HeaderInput type='text' placeholder='2022년 12월에 해야 할 일들' maxLength={15}/>
			</HeaderForm>
		</HeaderLayout>
	);
}