import { useAppSelector } from './useAppSelector';

const useSubscription = () => {
	const { createdSubscr, message, status, subscriptions } = useAppSelector(
		(state) => state.subscription
	);

	return { subscriptions, createdSubscr, status, message };
};

export default useSubscription;
