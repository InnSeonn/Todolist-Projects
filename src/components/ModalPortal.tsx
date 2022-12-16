import ReactDOM from 'react-dom';

export default function ModalPortal({ children }: { children: React.ReactNode }) {
	const modalElem = document.getElementById('modal') as HTMLElement;
	return ReactDOM.createPortal(children, modalElem);
}