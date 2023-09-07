export const checkUserRole = (user: User, givenRole: string) => {
	return user.roles?.find(
		(role) => role.title.toLocaleLowerCase() === givenRole.toLocaleLowerCase()
	)
		? true
		: false;
};
