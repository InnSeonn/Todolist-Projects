import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		font-family: inherit;
		letter-spacing: 0.1em;
	}
	body {
		margin: 0;
		font-family: 'Pretendard';
		line-height: 1;
	}
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	button {
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	input {
		padding: 0;
		border: none;
		background: none;
		outline: none;
	}
`;

export default GlobalStyle;