'use client';

import { useState } from 'react';
import { User, MapPin, SettingsIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Address from './address';
import Profile from './profile';
import Settings from './settings';
import { useAuthStore } from '@/store/useAuthStore';

export default function AccountView() {
	const [activeTab, setActiveTab] = useState<
		'profile' | 'addresses' | 'settings'
	>('profile');

	const user = useAuthStore((state) => state.user);

	const navItems = [
		{ id: 'profile', label: 'My Profile', icon: User },
		{ id: 'addresses', label: 'Addresses', icon: MapPin },
		{ id: 'settings', label: 'Settings', icon: SettingsIcon },
	] as const;

	const preferences: UserPreferences = {
		orderUpdates: true,
		promotions: false,
		securityAlerts: true,
		smsNotifications: false,
	};

	return (
		<div className='py-4 sm:py-8 md:py-12'>
			<header className='mb-10'>
				<h1 className='text-3xl font-bold tracking-tight text-foreground'>
					Account
				</h1>
				<p className='text-muted-foreground mt-2'>
					Manage your personal information and preferences.
				</p>
			</header>

			<div className='flex flex-col lg:flex-row gap-8'>
				<aside className='lg:w-64 shrink-0'>
					<nav className='flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0'>
						{navItems.map((item) => {
							const isActive = activeTab === item.id;
							const Icon = item.icon;
							return (
								<Button
									key={item.id}
									variant={isActive ? 'secondary' : 'ghost'}
									className={`justify-start gap-3 lg:w-full ${isActive ? 'bg-secondary font-semibold' : ''}`}
									onClick={() => setActiveTab(item.id)}
								>
									<Icon
										className={`size-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
									/>
									{item.label}
								</Button>
							);
						})}
					</nav>
				</aside>

				<main className='flex-1'>
					{activeTab === 'profile' && <Profile user={user} />}
					{activeTab === 'settings' && <Settings preferences={preferences} />}
					{activeTab === 'addresses' && <Address />}
				</main>
			</div>
		</div>
	);
}
