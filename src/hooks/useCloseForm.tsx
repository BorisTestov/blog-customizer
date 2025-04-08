import React, { useEffect } from 'react';

export type UseCloseForm = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useCloseForm = ({ isOpen, onClose, rootRef }: UseCloseForm) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && rootRef.current?.contains(target)) {
				return;
			}
			isOpen && onClose();
		};

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleEscKey);

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [isOpen, onClose, rootRef]);
};
