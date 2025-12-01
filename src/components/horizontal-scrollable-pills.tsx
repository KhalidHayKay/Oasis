interface HorizontalScrollablePillProps {
	categories: string[];
	active: { set: React.Dispatch<React.SetStateAction<string>>; value: string };
}

const HorizontalScrollablePill = ({
	categories,
	active,
}: HorizontalScrollablePillProps) => {
	return (
		<div className='relative -mx-4 px-4 sm:mx-0 sm:px-0'>
			<div className='flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory'>
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => active.set(category)}
						className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 snap-start ${
							active.value === category
								? 'bg-brand-800 text-white shadow-md'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
						}`}
					>
						{category}
					</button>
				))}
			</div>
		</div>
	);
};

export default HorizontalScrollablePill;
