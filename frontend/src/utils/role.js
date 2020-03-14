export const isAdmin = role => role === 'ADMIN';

export const isRealtorManageAllowed = role => role === 'ADMIN' || role === 'REALTOR';
