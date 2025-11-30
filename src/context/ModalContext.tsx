'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';

export type ModalType =
	| 'login'
	| 'signup'
	| 'forgot-password'
	| 'customer-info'
	| 'payment'
	| 'order-confirmed'
	| null;

interface ModalContextType {
	activeModal: ModalType;
	openModal: (modal: ModalType) => void;
	closeModal: () => void;
	modalData?: Record<string, any>;
	setModalData: (data: Record<string, any>) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [activeModal, setActiveModal] = useState<ModalType>(null);
	const [modalData, setModalData] = useState<Record<string, any>>({});

	const openModal = (modal: ModalType) => {
		setActiveModal(modal);
	};

	const closeModal = () => {
		setModalData({});
	};

	return (
		<ModalContext.Provider
			value={{ activeModal, openModal, closeModal, modalData, setModalData }}
		>
			{children}
		</ModalContext.Provider>
	);
}

export function useModal() {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within ModalProvider');
	}
	return context;
}
