'use client';
import { message as Toast } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
	setAgentFileIsError,
	setAgentFileIsSuccess,
} from '@/redux/agent-files/agent-files.slice';
import {
	setAgentIsError,
	setAgentIsSuccess,
} from '@/redux/agents/agents.slice';
import {
	setArticleIsError,
	setArticleIsSuccess,
} from '@/redux/article/article.slice';
import {
	setArticleUnityIsError,
	setArticleUnityIsSuccess,
} from '@/redux/article-unity/article-unity.slice';
import {
	setAttendencyIsError,
	setAttendencyIsSuccess,
} from '@/redux/attendency/attendency.slice';
import { setAuthIsError, setAuthIsSuccess } from '@/redux/auth/auth.slice';
import { setCongeIsError, setCongeIsSuccess } from '@/redux/conge/conge.slice';
import {
	setFolderElementIsError,
	setFolderElementIsSuccess,
} from '@/redux/folder-element/folder-element.slice';
import { setGradeIsError, setGradeIsSuccess } from '@/redux/grade/grade.slice';
import {
	setImmobIsError,
	setImmobIsSuccess,
} from '@/redux/immobilisations/immob.slice';
import {
	setInventaireIsError,
	setInventaireIsSuccess,
} from '@/redux/inventaire/inventaire.slice';
import { setOrderIsError, setOrderIsSuccess } from '@/redux/order/order.slice';
import {
	setCategoryIsError,
	setCategoryIsSuccess,
} from '@/redux/property-category/category.slice';
import {
	setRemunerationIsError,
	setRemunerationIsSuccess,
} from '@/redux/remuneration/remuneration.slice';
import { setRoleIsError, setRoleIsSuccess } from '@/redux/roles/role.slice';
import {
	setSectionIsError,
	setSectionIsSuccess,
} from '@/redux/service-section/section.slice';
import {
	setSubscriptionIsError,
	setSubscriptionIsSuccess,
} from '@/redux/soc-case-subscription/subscription.slice';
import {
	setSocialCaseIsError,
	setSocialCaseIsSuccess,
} from '@/redux/social-case/social-case.slice';

const ToastMessageManager = () => {
	const [toast, contextHolder] = Toast.useMessage({ maxCount: 2 });
	const dispach = useAppDispatch();

	/**
	 * Agent files toat manager
	 */
	const { status: agentFileStatus, message: agentFileMessage } = useAppSelector(
		(state) => state.agentFiles
	);

	useEffect(() => {
		if (agentFileStatus.isSuccess) {
			agentFileMessage && toast.success(agentFileMessage);
			dispach(setAgentFileIsSuccess(false));
		}
		if (agentFileStatus.isError) {
			agentFileMessage && toast.error(agentFileMessage);
			dispach(setAgentFileIsError(false));
		}
	}, [agentFileStatus]);

	/**
	 * Agents toat manager
	 */
	const { status: agentStatus, message: agentMessage } = useAppSelector(
		(state) => state.agents
	);

	useEffect(() => {
		if (agentStatus.isSuccess) {
			agentMessage && toast.success(agentMessage);
			dispach(setAgentIsSuccess(false));
		}
		if (agentStatus.isError) {
			agentMessage && toast.error(agentMessage);
			dispach(setAgentIsError(false));
		}
	}, [agentStatus]);

	/**
	 * Article toat manager
	 */
	const { status: articleStatus, message: artilceMessage } = useAppSelector(
		(state) => state.articles
	);

	useEffect(() => {
		if (articleStatus.isSuccess) {
			artilceMessage && toast.success(artilceMessage);
			dispach(setArticleIsSuccess(false));
		}
		if (articleStatus.isError) {
			artilceMessage && toast.error(artilceMessage);
			dispach(setArticleIsError(false));
		}
	}, [articleStatus]);

	/**
	 * Article unity toat manager
	 */
	const { status: unityStatus, message: unityMessage } = useAppSelector(
		(state) => state.articleUnity
	);

	useEffect(() => {
		if (unityStatus.isSuccess) {
			unityMessage && toast.success(unityMessage);
			dispach(setArticleUnityIsSuccess(false));
		}
		if (unityStatus.isError) {
			unityMessage && toast.error(unityMessage);
			dispach(setArticleUnityIsError(false));
		}
	}, [unityStatus]);

	/**
	 * Attendency toat manager
	 */
	const { status: attendencyStatus, message: attendencyMessage } =
		useAppSelector((state) => state.agents);

	useEffect(() => {
		if (attendencyStatus.isSuccess) {
			attendencyMessage && toast.success(attendencyMessage);
			dispach(setAttendencyIsSuccess(false));
		}
		if (attendencyStatus.isError) {
			attendencyMessage && toast.error(attendencyMessage);
			dispach(setAttendencyIsError(false));
		}
	}, [attendencyStatus]);

	/**
	 * Auth toat manager
	 */
	const { status: authStatus, message: authMessage } = useAppSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (authStatus.isSuccess) {
			authMessage && toast.success(authMessage);
			dispach(setAuthIsSuccess(false));
		}
		if (authStatus.isError) {
			authMessage && toast.error(authMessage);
			dispach(setAuthIsError(false));
		}
	}, [authStatus]);

	/**
	 * Agents toat manager
	 */
	const { status: congeStatus, message: congeMessage } = useAppSelector(
		(state) => state.conges
	);

	useEffect(() => {
		if (congeStatus.isSuccess) {
			congeMessage && toast.success(congeMessage);
			dispach(setCongeIsSuccess(false));
		}
		if (congeStatus.isError) {
			congeMessage && toast.error(congeMessage);
			dispach(setCongeIsError(false));
		}
	}, [congeStatus]);

	/**
	 * Folder element toat manager
	 */
	const { status: folderElmtStatus, message: folderElmtMessage } =
		useAppSelector((state) => state.folderElement);

	useEffect(() => {
		if (folderElmtStatus.isSuccess) {
			folderElmtMessage && toast.success(folderElmtMessage);
			dispach(setFolderElementIsSuccess(false));
		}
		if (folderElmtStatus.isError) {
			folderElmtMessage && toast.error(folderElmtMessage);
			dispach(setFolderElementIsError(false));
		}
	}, [folderElmtStatus]);

	/**
	 * Grades toat manager
	 */
	const { status: gradeStatus, message: gradeMessage } = useAppSelector(
		(state) => state.grade
	);

	useEffect(() => {
		if (gradeStatus.isSuccess) {
			gradeMessage && toast.success(gradeMessage);
			dispach(setGradeIsSuccess(false));
		}
		if (gradeStatus.isError) {
			gradeMessage && toast.error(gradeMessage);
			dispach(setGradeIsError(false));
		}
	}, [gradeStatus]);

	/**
	 * Immobs toat manager
	 */
	const { status: immobStatus, message: immobsMessage } = useAppSelector(
		(state) => state.immobs
	);

	useEffect(() => {
		if (immobStatus.isSuccess) {
			immobsMessage && toast.success(immobsMessage);
			dispach(setImmobIsSuccess(false));
		}
		if (immobStatus.isError) {
			immobsMessage && toast.error(immobsMessage);
			dispach(setImmobIsError(false));
		}
	}, [immobStatus]);

	/**
	 * Inventory toat manager
	 */
	const { status: invenStatus, message: inventMessage } = useAppSelector(
		(state) => state.inventaire
	);

	useEffect(() => {
		if (invenStatus.isSuccess) {
			inventMessage && toast.success(inventMessage);
			dispach(setInventaireIsSuccess(false));
		}
		if (invenStatus.isError) {
			inventMessage && toast.error(inventMessage);
			dispach(setInventaireIsError(false));
		}
	}, [invenStatus]);

	/**
	 * Order toat manager
	 */
	const { status: orderStatus, message: OrderMessage } = useAppSelector(
		(state) => state.order
	);

	useEffect(() => {
		if (orderStatus.isSuccess) {
			OrderMessage && toast.success(OrderMessage);
			dispach(setOrderIsSuccess(false));
		}
		if (orderStatus.isError) {
			OrderMessage && toast.error(OrderMessage);
			dispach(setOrderIsError(false));
		}
	}, [orderStatus]);

	/**
	 * Category toat manager
	 */
	const { status: categStatus, message: categMessage } = useAppSelector(
		(state) => state.category
	);

	useEffect(() => {
		if (categStatus.isSuccess) {
			categMessage && toast.success(categMessage);
			dispach(setCategoryIsSuccess(false));
		}
		if (categStatus.isError) {
			categMessage && toast.error(categMessage);
			dispach(setCategoryIsError(false));
		}
	}, [categStatus]);

	/**
	 * Pay toat manager
	 */
	const { status: payStatus, message: payMessage } = useAppSelector(
		(state) => state.remuneration
	);

	useEffect(() => {
		if (payStatus.isSuccess) {
			payMessage && toast.success(payMessage);
			dispach(setRemunerationIsSuccess(false));
		}
		if (payStatus.isError) {
			payMessage && toast.error(payMessage);
			dispach(setRemunerationIsError(false));
		}
	}, [payStatus]);

	/**
	 * Roles toat manager
	 */
	const { status: roleStatus, message: roleMessage } = useAppSelector(
		(state) => state.role
	);

	useEffect(() => {
		if (roleStatus.isSuccess) {
			roleMessage && toast.success(roleMessage);
			dispach(setRoleIsSuccess(false));
		}
		if (roleStatus.isError) {
			roleMessage && toast.error(roleMessage);
			dispach(setRoleIsError(false));
		}
	}, [roleStatus]);

	/**
	 * Services and sections toat manager
	 */
	const { status: serviceStatus, message: serviceMessage } = useAppSelector(
		(state) => state.service
	);

	useEffect(() => {
		if (serviceStatus.isSuccess) {
			serviceMessage && toast.success(serviceMessage);
			dispach(setSectionIsSuccess(false));
		}
		if (serviceStatus.isError) {
			serviceMessage && toast.error(serviceMessage);
			dispach(setSectionIsError(false));
		}
	}, [serviceStatus]);

	/**
	 * subscription toat manager
	 */
	const { status: subscriptionStatus, message: subsciptionMessage } =
		useAppSelector((state) => state.subscription);

	useEffect(() => {
		if (subscriptionStatus.isSuccess) {
			subsciptionMessage && toast.success(subsciptionMessage);
			dispach(setSubscriptionIsSuccess(false));
		}
		if (subscriptionStatus.isError) {
			subsciptionMessage && toast.error(subsciptionMessage);
			dispach(setSubscriptionIsError(false));
		}
	}, [subscriptionStatus]);

	/**
	 * Social cases toat manager
	 */
	const { status: socCaseStatus, message: socCaseMessage } = useAppSelector(
		(state) => state.socialCase
	);

	useEffect(() => {
		if (socCaseStatus.isSuccess) {
			socCaseMessage && toast.success(socCaseMessage);
			dispach(setSocialCaseIsSuccess(false));
		}
		if (socCaseStatus.isError) {
			socCaseMessage && toast.error(socCaseMessage);
			dispach(setSocialCaseIsError(false));
		}
	}, [socCaseStatus]);

	return (
		<>
			{contextHolder}
			<div></div>
		</>
	);
};

export default ToastMessageManager;
