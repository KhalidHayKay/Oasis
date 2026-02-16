import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { SortOption } from '@/hooks/useProductSorting';

type Props = {
	value: SortOption;
	onChange: (value: SortOption) => void;
};

const filters = [
	{ label: 'Most Recent', value: 'recent' },
	{ label: 'Price: Low to High', value: 'price-low' },
	{ label: 'Price: High to Low', value: 'price-high' },
	{ label: 'Most Popular', value: 'popular' },
];

const ProductSortDropdown = ({ value, onChange }: Props) => (
	<Select value={value} onValueChange={(value) => onChange(value as SortOption)}>
		<SelectTrigger className='w-[180px] h-10 border-gray-300 rounded-lg overflow-hidden'>
			<div className='flex items-center gap-2'>
				<span className='text-sm text-gray-600'>Sort by:</span>
				<SelectValue />
			</div>
		</SelectTrigger>
		<SelectContent>
			{filters.map((f) => (
				<SelectItem key={f.value} value={f.value} className='text-sm'>
					{f.label}
				</SelectItem>
			))}
		</SelectContent>
	</Select>
);

export default ProductSortDropdown;
