// useOutsideClickClose.ts

import { useEffect } from 'react';

type UseOutsideClickCloseArgs = {
	isOpen: boolean;
	onChange?: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>; // Здесь мы используем общий HTMLElement, чтобы не ограничиваться div'ами
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickCloseArgs) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				isOpen &&
				target instanceof Node &&
				!rootRef.current?.contains(target)
			) {
				onClose?.();
				onChange?.(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (isOpen && event.key === 'Escape') {
				onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose, onChange]);
};
