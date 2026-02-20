import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Edit2, Plus, Trash2 } from 'lucide-react';

const Address = () => {
	return (
		<div className='space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500'>
			<div className='flex justify-between items-center'>
				<h2 className='text-lg font-semibold'>Saved Addresses</h2>
				<Button
					size='sm'
					className='h-9 bg-brand-700 hover:bg-brand-800 text-white rounded-md'
				>
					<Plus className='size-4 mr-2' /> Add New
				</Button>
			</div>
			<div className='grid md:grid-cols-2 gap-4'>
				{[1, 2].map((i) => (
					<Card key={i} className='relative group'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<div className='flex items-center gap-2'>
								<Badge variant={i === 1 ? 'default' : 'outline'}>
									{i === 1 ? 'Home' : 'Work'}
								</Badge>
								{i === 1 && (
									<span className='text-xs text-muted-foreground'>Default</span>
								)}
							</div>
							<div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
								<Button variant='ghost' size='icon' className='size-8'>
									<Edit2 className='size-3' />
								</Button>
								<Button variant='ghost' size='icon' className='size-8 text-destructive'>
									<Trash2 className='size-3' />
								</Button>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-sm text-muted-foreground'>
								123 Oasis Blvd, Lagos, LA 100001, Nigeria
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Address;
