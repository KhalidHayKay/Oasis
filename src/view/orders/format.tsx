export const FormatDate = ({ date }: { date: string }) => (
	<span>
		{new Date(date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		})}
	</span>
);

export const FormatCurrency = ({ value }: { value: number }) => (
	<span className='font-mono tracking-tight'>${value.toFixed(2)}</span>
);
