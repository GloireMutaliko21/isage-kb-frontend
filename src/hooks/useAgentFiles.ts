import { useAppSelector } from './useAppSelector';

const useAgentFiles = () => {
	const { agentFile, message, status } = useAppSelector(
		(state) => state.agentFiles
	);
	return { agentFile, status, message };
};

export default useAgentFiles;
