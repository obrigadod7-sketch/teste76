// Whitelist of administrator emails.
// Only these accounts can access the /admin dashboard and request password recovery as admin.
export const ADMIN_EMAILS = [
  'brigadod7@gmail.com',
  'mecjohnson97@gmail.com',
];

export const isAdminEmail = (email) =>
  !!email && ADMIN_EMAILS.includes(String(email).trim().toLowerCase());
