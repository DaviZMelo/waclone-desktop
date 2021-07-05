export default function ensureUserAuthorized(
  userId: number,
  allowedUsers: Array<number>,
  masterUser: number,
): boolean {
  const isAllowedUser = allowedUsers.includes(userId);

  const isMasterUser = userId === masterUser;

  if (isAllowedUser || isMasterUser) {
    return true;
  }

  return false;
}
