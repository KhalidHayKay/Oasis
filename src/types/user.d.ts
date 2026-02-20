interface User {
	email: string;
	name: string;
	avatar: string;
	emailVerified?: string | null;
}

interface UserPreferences {
	orderUpdates: boolean;
	promotions: boolean;
	securityAlerts: boolean;
	smsNotifications: boolean;
}
