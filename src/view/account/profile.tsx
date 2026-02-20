import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const profileSchema = z.object({
	name: z.string().min(2, 'Last name must be at least 2 characters'),
	email: z.email('Invalid email address'),
	phone: z.string().min(10, 'Invalid phone number'),
});

type ProfileValues = z.infer<typeof profileSchema>;
const Profile = ({ user }: { user: User | null }) => {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<ProfileValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user?.name,
			email: user?.email,
			phone: '+123412341234',
		},
	});

	async function onSubmit(values: ProfileValues) {
		setIsLoading(true);
		await new Promise((r) => setTimeout(r, 1000));
		console.log(values);
		setIsLoading(false);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500'
			>
				<Card>
					<CardHeader>
						<CardTitle>Profile Information</CardTitle>
						<CardDescription>Update your photo and personal details.</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='flex items-center gap-6'>
							<div className='relative'>
								<Avatar className='size-20 sm:size-24'>
									<AvatarImage src={user?.avatar} />
									<AvatarFallback>FU</AvatarFallback>
								</Avatar>
								<Button
									size='icon'
									variant='secondary'
									className='absolute -bottom-1 -right-1 rounded-full size-8 border shadow-sm'
								>
									<Camera className='size-4' />
								</Button>
							</div>
							<div className='space-y-1'>
								<h4 className='text-sm font-medium'>Profile Photo</h4>
								<p className='text-xs text-muted-foreground'>
									JPG, PNG or GIF. Max 1MB.
								</p>
								<div className='flex gap-2 mt-2'>
									<Button variant='outline' size='sm' className='bg-brand-50'>
										Change
									</Button>
									<Button variant='ghost' size='sm' className='text-destructive'>
										Remove
									</Button>
								</div>
							</div>
						</div>

						<Separator />

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} className='h-12 rounded-xl border-gray-200' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												{...field}
												className='h-12 rounded-xl border-gray-200'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input
												type='tel'
												{...field}
												className='h-12 rounded-xl border-gray-200'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>
				<div className='flex justify-end'>
					<Button
						type='submit'
						disabled={isLoading}
						className='h-12 bg-brand-700 hover:bg-brand-800 text-white rounded-full'
					>
						{isLoading && <Loader2 className='mr-2 size-4 animate-spin' />}
						Save Changes
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Profile;
