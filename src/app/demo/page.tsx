import { ModalManager } from '@/components/modal-manager';
import { ModalProvider } from '@/context/ModalContext';
import DemoView from '@/view/demo';

export default function Page() {
	return (
		<ModalProvider>
			<DemoView />

			<ModalManager />
		</ModalProvider>
	);
}
