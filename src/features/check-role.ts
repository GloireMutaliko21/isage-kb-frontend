export const checkUserRole = (user: any, givenRole: string) => {
	return user?.roles?.find(
		(role: any) =>
			role.title.toLocaleLowerCase() === givenRole.toLocaleLowerCase()
	)
		? true
		: false;
};
