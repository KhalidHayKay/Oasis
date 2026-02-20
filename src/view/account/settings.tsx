import AppButton from '@/components/app-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const settingsSchema = z.object({
	orderUpdates: z.boolean(),
	promotions: z.boolean(),
	securityAlerts: z.boolean(),
	smsNotifications: z.boolean(),
});

type SettingsValues = z.infer<typeof settingsSchema>;

const Settings = ({ preferences }: { preferences: UserPreferences }) => {
	const form = useForm<SettingsValues>({
		resolver: zodResolver(settingsSchema),
		defaultValues: preferences,
	});

	return (
		<Form {...form}>
			<div className='space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500'>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<Bell className='size-5' /> Notifications
						</CardTitle>
					</CardHeader>
					<CardContent className='divide-y'>
						{(Object.keys(preferences) as Array<keyof SettingsValues>).map((key) => (
							<FormField
								key={key}
								control={form.control}
								name={key}
								render={({ field }) => (
									<FormItem className='flex items-center justify-between py-4'>
										<div className='space-y-0.5'>
											<FormLabel className='capitalize'>
												{key.replace(/([A-Z])/g, ' $1')}
											</FormLabel>
											<FormDescription>
												Receive alerts regarding this category.
											</FormDescription>
										</div>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
						))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							<ShieldCheck className='size-5' /> Security
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex items-center justify-between'>
							<div className='space-y-0.5'>
								<p className='text-sm font-medium'>Two-Factor Authentication</p>
								<p className='text-xs text-muted-foreground'>
									Secure your account with 2FA.
								</p>
							</div>
							<Switch />
						</div>
						<Separator />
						<div className='flex items-center justify-between'>
							<div className='space-y-0.5'>
								<p className='text-sm font-medium'>Password</p>
								<p className='text-xs text-muted-foreground'>
									Last changed 3 months ago
								</p>
							</div>
							<AppButton>Update</AppButton>
						</div>
					</CardContent>
				</Card>
			</div>
		</Form>
	);
};

export default Settings;
