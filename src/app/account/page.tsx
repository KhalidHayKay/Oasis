'use client';

import React, { useState, FormEvent } from 'react';
import {
	User,
	Settings,
	Bell,
	ShieldCheck,
	MapPin,
	Camera,
	Loader2,
	Check,
	Plus,
	Trash2,
	Edit2,
	Moon,
	Sun,
} from 'lucide-react';
import Image from 'next/image';

// --- Types & Interfaces ---

interface UserProfile {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	avatarUrl: string;
}

interface Address {
	id: string;
	type: 'Home' | 'Work' | 'Other';
	details: string;
	isDefault: boolean;
}

interface NotificationSettings {
	orderUpdates: boolean;
	promotions: boolean;
	securityAlerts: boolean;
	smsNotifications: boolean;
}

interface UserAccountData {
	profile: UserProfile;
	addresses: Address[];
	settings: NotificationSettings;
	theme: 'light' | 'dark' | 'system';
}

// --- Dummy Data ---

const INITIAL_DATA: UserAccountData = {
	profile: {
		firstName: 'Felipe',
		lastName: 'User',
		email: 'felipe.user@example.com',
		phone: '+1 (555) 000-1234',
		avatarUrl:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
	},
	addresses: [
		{
			id: '1',
			type: 'Home',
			details: '123 Oasis Blvd, Lagos, LA 100001, Nigeria',
			isDefault: true,
		},
		{
			id: '2',
			type: 'Work',
			details: '45 Tech Park, Silicon Valley, CA 94000, USA',
			isDefault: false,
		},
	],
	settings: {
		orderUpdates: true,
		promotions: false,
		securityAlerts: true,
		smsNotifications: false,
	},
	theme: 'light',
};

// --- Reusable UI Components ---

const Button = ({
	children,
	variant = 'primary',
	isLoading,
	onClick,
	className = '',
	type = 'button',
}: {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary' | 'danger' | 'outline';
	isLoading?: boolean;
	onClick?: () => void;
	className?: string;
	type?: 'button' | 'submit';
}) => {
	const baseStyles =
		'inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

	const variants = {
		primary:
			'bg-brand-800 hover:bg-brand-700 text-white shadow-sm shadow-brand-200 focus:ring-brand-500',
		secondary:
			'bg-grey-100 hover:bg-grey-200 text-foreground focus:ring-grey-400',
		outline: 'border border-border bg-transparent hover:bg-muted text-foreground',
		danger:
			'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive',
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isLoading}
			className={`${baseStyles} ${variants[variant]} ${className}`}
		>
			{isLoading ? <Loader2 className='mr-2 size-4 animate-spin' /> : null}
			{children}
		</button>
	);
};

const InputGroup = ({
	label,
	value,
	onChange,
	type = 'text',
	placeholder,
}: {
	label: string;
	value: string;
	onChange: (val: string) => void;
	type?: string;
	placeholder?: string;
}) => (
	<div className='space-y-1.5'>
		<label className='text-sm font-medium text-grey-700'>{label}</label>
		<input
			type={type}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className='w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-grey-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all'
		/>
	</div>
);

const ToggleSwitch = ({
	label,
	description,
	checked,
	onChange,
}: {
	label: string;
	description?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}) => (
	<div className='flex items-center justify-between py-3'>
		<div className='space-y-0.5'>
			<h4 className='text-sm font-medium text-foreground'>{label}</h4>
			{description && <p className='text-xs text-grey-500'>{description}</p>}
		</div>
		<button
			type='button'
			onClick={() => onChange(!checked)}
			className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
				checked ? 'bg-brand-800' : 'bg-grey-200'
			}`}
		>
			<span
				className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
					checked ? 'translate-x-5' : 'translate-x-0'
				}`}
			/>
		</button>
	</div>
);

// --- Sub-Pages (Sections) ---

/**
 * 1. Profile Section
 * Handles personal details and avatar.
 */
const ProfileSection = ({ data }: { data: UserProfile }) => {
	const [formData, setFormData] = useState(data);
	const [isSaving, setIsSaving] = useState(false);
	const [message, setMessage] = useState<'saved' | null>(null);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSaving(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsSaving(false);
		setMessage('saved');
		setTimeout(() => setMessage(null), 3000);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500'
		>
			{/* Header */}
			<div>
				<h2 className='text-xl font-semibold text-foreground'>
					Profile Information
				</h2>
				<p className='text-sm text-grey-500 mt-1'>
					Update your photo and personal details.
				</p>
			</div>

			<div className='border border-border rounded-xl p-6 bg-card space-y-6'>
				{/* Avatar Upload */}
				<div className='flex items-center gap-6'>
					<div className='relative group size-20 sm:size-24 shrink-0'>
						<Image
							src={formData.avatarUrl}
							alt='Profile'
							fill
							className='size-full rounded-full object-cover border-2 border-muted'
						/>
						<button
							type='button'
							className='absolute bottom-0 right-0 bg-brand-800 text-white p-1.5 rounded-full shadow-md hover:bg-brand-700 transition-colors'
						>
							<Camera className='size-4' />
						</button>
					</div>
					<div>
						<h3 className='font-medium text-foreground'>Profile Photo</h3>
						<p className='text-xs text-grey-500 mb-3'>
							Accepts JPG, PNG or GIF. Max 1MB.
						</p>
						<div className='flex gap-2'>
							<Button variant='outline' className='h-8 text-xs px-3'>
								Change
							</Button>
							<Button
								variant='outline'
								className='h-8 text-xs px-3 text-destructive hover:text-destructive'
							>
								Remove
							</Button>
						</div>
					</div>
				</div>

				<div className='h-px bg-border w-full' />

				{/* Form Fields */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					<InputGroup
						label='First Name'
						value={formData.firstName}
						onChange={(v) => setFormData({ ...formData, firstName: v })}
					/>
					<InputGroup
						label='Last Name'
						value={formData.lastName}
						onChange={(v) => setFormData({ ...formData, lastName: v })}
					/>
					<InputGroup
						label='Email Address'
						type='email'
						value={formData.email}
						onChange={(v) => setFormData({ ...formData, email: v })}
					/>
					<InputGroup
						label='Phone Number'
						type='tel'
						value={formData.phone}
						onChange={(v) => setFormData({ ...formData, phone: v })}
					/>
				</div>
			</div>

			<div className='flex items-center justify-end gap-4'>
				{message === 'saved' && (
					<span className='text-sm text-green-600 flex items-center gap-1'>
						<Check className='size-4' /> Saved successfully
					</span>
				)}
				<Button type='submit' isLoading={isSaving}>
					Save Changes
				</Button>
			</div>
		</form>
	);
};

/**
 * 2. Addresses Section
 * List and manage saved addresses.
 */
const AddressesSection = ({ data }: { data: Address[] }) => {
	return (
		<div className='space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500'>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-xl font-semibold text-foreground'>My Addresses</h2>
					<p className='text-sm text-grey-500 mt-1'>
						Manage your shipping and billing locations.
					</p>
				</div>
				<Button className='h-9 px-3 text-xs gap-1.5'>
					<Plus className='size-3.5' /> Add New
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{data.map((addr) => (
					<div
						key={addr.id}
						className='border border-border rounded-xl p-5 bg-card hover:border-brand-300 transition-colors group relative'
					>
						<div className='flex justify-between items-start mb-3'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-muted rounded-lg text-brand-800'>
									<MapPin className='size-4' />
								</div>
								<span className='font-medium text-foreground'>{addr.type}</span>
								{addr.isDefault && (
									<span className='text-[10px] font-semibold bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full border border-brand-200'>
										Default
									</span>
								)}
							</div>
							<div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
								<button className='text-grey-400 hover:text-brand-800 transition-colors'>
									<Edit2 className='size-4' />
								</button>
								<button className='text-grey-400 hover:text-destructive transition-colors'>
									<Trash2 className='size-4' />
								</button>
							</div>
						</div>
						<p className='text-sm text-grey-600 leading-relaxed pr-4'>
							{addr.details}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

/**
 * 3. Settings Section
 * Notifications, Security, etc.
 */
const SettingsSection = ({
	data,
	theme,
}: {
	data: NotificationSettings;
	theme: string;
}) => {
	const [settings, setSettings] = useState(data);

	const toggle = (key: keyof NotificationSettings) => {
		setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<div className='space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500'>
			<div>
				<h2 className='text-xl font-semibold text-foreground'>Preferences</h2>
				<p className='text-sm text-grey-500 mt-1'>
					Manage how we contact you and your security.
				</p>
			</div>

			{/* Notifications Card */}
			<div className='border border-border rounded-xl bg-card overflow-hidden'>
				<div className='px-6 py-4 bg-muted/30 border-b border-border'>
					<div className='flex items-center gap-2 text-foreground font-medium'>
						<Bell className='size-4' /> Notifications
					</div>
				</div>
				<div className='p-6 divide-y divide-border'>
					<ToggleSwitch
						label='Order Updates'
						description='Get notified when your order status changes.'
						checked={settings.orderUpdates}
						onChange={() => toggle('orderUpdates')}
					/>
					<ToggleSwitch
						label='Promotions & Offers'
						description='Receive emails about new products and sales.'
						checked={settings.promotions}
						onChange={() => toggle('promotions')}
					/>
					<ToggleSwitch
						label='SMS Notifications'
						description='Get urgent updates via text message.'
						checked={settings.smsNotifications}
						onChange={() => toggle('smsNotifications')}
					/>
				</div>
			</div>

			{/* Security Card */}
			<div className='border border-border rounded-xl bg-card overflow-hidden'>
				<div className='px-6 py-4 bg-muted/30 border-b border-border'>
					<div className='flex items-center gap-2 text-foreground font-medium'>
						<ShieldCheck className='size-4' /> Security
					</div>
				</div>
				<div className='p-6 space-y-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h4 className='text-sm font-medium text-foreground'>Password</h4>
							<p className='text-xs text-grey-500'>Last changed 3 months ago</p>
						</div>
						<Button variant='outline' className='h-8 text-xs'>
							Update
						</Button>
					</div>

					<div className='h-px bg-border w-full' />

					<ToggleSwitch
						label='Two-Factor Authentication'
						description='Add an extra layer of security to your account.'
						checked={settings.securityAlerts}
						onChange={() => toggle('securityAlerts')}
					/>
				</div>
			</div>

			{/* Theme Preference (Bonus) */}
			<div className='border border-border rounded-xl bg-card p-6 flex items-center justify-between'>
				<div>
					<h4 className='text-sm font-medium text-foreground'>Appearance</h4>
					<p className='text-xs text-grey-500'>Customize how Oasis looks for you.</p>
				</div>
				<div className='flex p-1 bg-muted rounded-lg border border-border'>
					<button
						className={`p-1.5 rounded ${theme === 'light' ? 'bg-white shadow-sm text-brand-800' : 'text-grey-500'}`}
					>
						<Sun className='size-4' />
					</button>
					<button
						className={`p-1.5 rounded ${theme === 'dark' ? 'bg-grey-800 text-white shadow-sm' : 'text-grey-500'}`}
					>
						<Moon className='size-4' />
					</button>
				</div>
			</div>
		</div>
	);
};

// --- Main Page Wrapper ---

export default function AccountSettingsPage() {
	const [activeTab, setActiveTab] = useState<
		'profile' | 'addresses' | 'settings'
	>('profile');

	// Navigation Items
	const navItems = [
		{ id: 'profile', label: 'My Profile', icon: User },
		{ id: 'addresses', label: 'Addresses', icon: MapPin },
		{ id: 'settings', label: 'Settings', icon: Settings },
	] as const;

	return (
		<div className='min-h-screen bg-background font-sans p-4 sm:p-8 md:p-12'>
			<div className='max-w-6xl mx-auto'>
				{/* Page Title */}
				<div className='mb-8 md:mb-12'>
					<h1 className='heading-section'>Account</h1>
					<p className='text-grey-600 mt-2'>
						Manage your personal information and preferences.
					</p>
				</div>

				<div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
					{/* Sidebar Navigation */}
					<aside className='lg:w-64 shrink-0'>
						<nav className='flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide'>
							{navItems.map((item) => {
								const isActive = activeTab === item.id;
								const Icon = item.icon;
								return (
									<button
										key={item.id}
										onClick={() => setActiveTab(item.id)}
										className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                        ${
																									isActive
																										? 'bg-brand-50 text-brand-800 shadow-sm ring-1 ring-brand-200'
																										: 'text-grey-600 hover:bg-muted hover:text-foreground'
																								}
                      `}
									>
										<Icon
											className={`size-4 ${isActive ? 'text-brand-800' : 'text-grey-400'}`}
										/>
										{item.label}
									</button>
								);
							})}
						</nav>
					</aside>

					{/* Main Content Area */}
					<main className='flex-1 min-w-0'>
						{activeTab === 'profile' && (
							<ProfileSection data={INITIAL_DATA.profile} />
						)}
						{activeTab === 'addresses' && (
							<AddressesSection data={INITIAL_DATA.addresses} />
						)}
						{activeTab === 'settings' && (
							<SettingsSection
								data={INITIAL_DATA.settings}
								theme={INITIAL_DATA.theme}
							/>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
