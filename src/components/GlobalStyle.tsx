import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
		--max-width: 768px;

		--font-size-12: 0.75rem; /* 12 */
		--font-size-14: 0.875rem;  /* 14 */
		--font-size-16: 1rem; /* 16 */
		--font-size-20: 1.25rem; /* 20 */
		--font-size-32: 2rem; /* 32 */

		--color-bg: #E3E9FF;
		--color-primary: #AF7EEB;
		--color-primary-dark: #7b56ad;
		--color-primary-light: #C8BAFF;
		--color-accent: #fd8f52;
		--color-accent-light: #efbb9e;
		--color-grey-dark: #8C8F9E;
		--color-grey-light: #DBDEE3;
	}

	@font-face {
		font-family: 'Pretendard';
		font-weight: 45 920;
		font-style: normal;
		font-display: swap;
		src: local('Pretendard Variable'), url(${require('../fonts/PretendardVariable.woff2')}) format('woff2-variations');
	}

	* {
		box-sizing: border-box;
		font-family: inherit;
		letter-spacing: 0.05em;
	}
	body {
		margin: 0;
		font-size: 16px;
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

	.react-datepicker {
		width: 100%;
		border: none;
		border-color: var(--color-grey-light);
		font-family: 'Pretendard';

		&__tab-loop {
			width: 100%;
			height: 100%;
		}
	
		&__header {
			border: none;
			background-color: #fff;
			font-size: var(--font-size-16);
			@media screen and (max-width: 450px) {
				font-size: var(--font-size-14);
			}
		}
	
		&__day {
			width: 1.7em;
			margin: 0.5em;
			line-height: 1.7em;
			&-name {
				width: 1.7em;
				margin: 0.5em;
				line-height: 1.7em;
			}
			&--today {
				color: var(--color-accent);
			}
			&--selected {
				background-color: var(--color-primary);
				color: #fff;
				&:hover {
					background-color: var(--color-primary-dark);
				}
			}
		}
	
		&__current-month {
			padding: 0.5em 0;
			font-size: var(--font-size-16);
			@media screen and (max-width: 450px) {
				font-size: var(--font-size-14);
			}
		}
	
		&__month {
			margin: 1em;
			margin-top: 0.4em;
			font-size: var(--font-size-16);
			font-weight: 600;
			@media screen and (max-width: 450px) {
				font-size: var(--font-size-14);
			}
			&-container {
				float: none;
				width: 100%;
			}
		}
	
		&__navigation {
			top: 50%;
			&-icon::before {
				border-width: 2px 2px 0 0;
				width: 6px;
				height: 6px;
			}
			@media screen and (min-width: 450px) {
				&--previous {
					left: calc(50% - 16em);
				}
				&--next {
					right: calc(50% - 16em);
				}
			}
		}

		&__triangle {
			display: none;
		}
	
		&-popper {
			position: absolute;
			inset: auto auto 0 0 !important;
			width: 100%;
			padding: 0 !important;
			box-shadow: 0 -2px 16px 0 rgba(225, 225, 225, 0.5);
			transform: none !important;
		}
	}
`;

export default GlobalStyle;