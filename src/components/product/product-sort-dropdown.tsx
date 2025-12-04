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
		<SelectTrigger className='w-60 md:w-48 p-7 rounded-2xl text-lg'>
			<SelectValue />
		</SelectTrigger>
		<SelectContent>
			{filters.map((f, i) => (
				<SelectItem key={i} value={f.value} className='text-base'>
					{f.label}
				</SelectItem>
			))}
		</SelectContent>
	</Select>
);

export default ProductSortDropdown;
