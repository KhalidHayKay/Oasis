const StatusBadge = ({ status }: { status: Order['status'] }) => {
	const styles = {
		processing: 'bg-yellow-100 text-yellow-700 border-yellow-200',
		confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
		shipped: 'bg-brand-100 text-brand-800 border-brand-200',
		delivered: 'bg-green-100 text-green-700 border-green-200',
		cancelled: 'bg-red-100 text-red-700 border-red-200',
	};

	return (
		<span
			className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.processing} capitalize`}
		>
			{status}
		</span>
	);
};

export default StatusBadge;
