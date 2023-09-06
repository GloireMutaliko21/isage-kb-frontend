export const returnApiError = (error: any) => {
	if (Array.isArray(error?.response?.data?.message))
		return error?.response?.data.message[0];
	if (
		typeof error?.response?.data === 'object' &&
		!Array.isArray(error?.response?.data?.message)
	)
		return error.response?.data.message;
	return error.message;
};
