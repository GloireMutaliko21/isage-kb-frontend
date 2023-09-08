export const STATUS = {
	PENDING: {
		isLoading: true,
		isSuccess: false,
		isError: false,
	},
	SUCCESS: {
		isLoading: false,
		isSuccess: true,
		isError: false,
	},
	ERROR: {
		isLoading: false,
		isSuccess: false,
		isError: true,
	},
};
