'use client';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { closeModal } from '@/redux/modalWindow/modalwindow.slice';
import { useCallback } from 'react';
import CreateGrade from './CreateGrade';
import UpdateGradeRate from './UpdateGradeRate';
import UpdateGradeFolderIds from './UpdateGradeFolderIds';
import CreateFolderElement from './CreateFolderElement';
import DetailFolderElement from './DetailFolderElement';
import CreateRole from './CreateRole';
import DetailRole from './DetailRole';
import CreateAccess from './CreateAccess';
import CreateService from './CreateService';
import DetailService from './DetailService';
import CreateAgent from './CreateAgent';
import UpdateAgent from './UpdateAgent';
import UpdateAgentGrade from './UpdateAgentGrade';
import CreateAttendency from './CreateAttendency';
import CreateLeave from './CreateLeave';
import SuppHours from './salaryDetails/SuppHours';
import Ferie from './salaryDetails/Ferie';
import Conge from './salaryDetails/Conge';
import MaladAcc from './salaryDetails/MaladAcc';
import Primes from './salaryDetails/Primes';
import Deductions from './salaryDetails/Deduction';
import Allocations from './salaryDetails/Allocations';
import GeneratePayroll from './GeneratePayroll';
import UpdateSocCase from './UpdateSocCase';
import CreateAndUpdateArticle from './inventory/CreateAndUpdateArticle';
import CreateOrder from './inventory/CreateOrder';
import CreateAndUpdateUnity from './inventory/CreateAndUpdateUnity';
import CreateAndUpdateCategory from './inventory/CreateAndUpdateCategory';
import RemoveAccess from './RemoveAccess';

const ModalManager = () => {
	const { modal_ID, payload, thread } = useAppSelector((state) => state.modal);
	const dispatch = useAppDispatch();
	const close = useCallback(() => dispatch(closeModal()), [dispatch]);
	return (
		<div className=''>
			{/* Grades */}
			{modal_ID == 'NEW_GRADE' && (
				<CreateGrade handlers={{ close, id: 'NEW_GRADE' }} />
			)}
			{modal_ID == 'UPDATE_GRADE_RATES' && (
				<UpdateGradeRate handlers={{ close, id: 'UPDATE_GRADE_RATES' }} />
			)}
			{modal_ID == 'UPDATE_GRADE_FOLDERS' && (
				<UpdateGradeFolderIds
					handlers={{ close, id: 'UPDATE_GRADE_FOLDERS' }}
				/>
			)}

			{/* Folder elements */}
			{modal_ID == 'NEW_FOLDER_ELEMENT' && (
				<CreateFolderElement handlers={{ close, id: 'NEW_FOLDER_ELEMENT' }} />
			)}
			{modal_ID == 'FOLDER_ELEMENT_UPDATE' && (
				<CreateFolderElement
					handlers={{ close, id: 'FOLDER_ELEMENT_UPDATE' }}
				/>
			)}
			{modal_ID == 'FOLDER_ELEMENT_DETAILS' && (
				<DetailFolderElement
					handlers={{ close, id: 'FOLDER_ELEMENT_DETAILS' }}
				/>
			)}

			{/* Rôles */}
			{modal_ID == 'NEW_ROLE' && (
				<CreateRole handlers={{ close, id: 'NEW_ROLE' }} />
			)}
			{modal_ID == 'UPDATE_ROLE' && (
				<CreateRole handlers={{ close, id: 'UPDATE_ROLE' }} />
			)}
			{modal_ID == 'ROLE_DETAILS' && (
				<DetailRole handlers={{ close, id: 'ROLE_DETAILS' }} />
			)}
			{modal_ID == 'CREATE_ACCESS' && (
				<CreateAccess handlers={{ close, id: 'CREATE_ACCESS' }} />
			)}
			{modal_ID == 'REMOVE_ACCESS' && (
				<RemoveAccess handlers={{ close, id: 'REMOVE_ACCESS' }} />
			)}

			{/* Services and sections */}
			{modal_ID == 'NEW_SERVICE' && (
				<CreateService handlers={{ close, id: 'NEW_SERVICE' }} />
			)}
			{modal_ID == 'SERVICE_UPDATE' && (
				<CreateService handlers={{ close, id: 'SERVICE_UPDATE' }} />
			)}
			{modal_ID == 'SERVICE_DETAILS' && (
				<DetailService handlers={{ close, id: 'SERVICE_DETAILS' }} />
			)}

			{/* Agents */}
			{modal_ID == 'NEW_AGENT' && (
				<CreateAgent handlers={{ close, id: 'NEW_AGENT' }} />
			)}
			{modal_ID == 'UPDATE_AGENT' && (
				<UpdateAgent handlers={{ close, id: 'UPDATE_AGENT' }} />
			)}
			{modal_ID == 'UPDATE_AGENT_GRADE' && (
				<UpdateAgentGrade handlers={{ close, id: 'UPDATE_AGENT_GRADE' }} />
			)}

			{/* Attendency */}
			{modal_ID == 'NEW_ATTENDENCY' && (
				<CreateAttendency handlers={{ close, id: 'NEW_ATTENDENCY' }} />
			)}

			{/* Leave */}
			{modal_ID == 'NEW_LEAVE' && (
				<CreateLeave handlers={{ close, id: 'NEW_LEAVE' }} />
			)}

			{/* Pay */}
			{modal_ID == 'HEURE_SUPP' && (
				<SuppHours handlers={{ close, id: 'HEURE_SUPP' }} />
			)}
			{modal_ID == 'REM_FERIE' && (
				<Ferie handlers={{ close, id: 'REM_FERIE' }} />
			)}
			{modal_ID == 'REM_CONGE' && (
				<Conge handlers={{ close, id: 'REM_CONGE' }} />
			)}
			{modal_ID == 'REM_MALAD' && (
				<MaladAcc handlers={{ close, id: 'REM_MALAD' }} />
			)}
			{modal_ID == 'PRIME_GRATIF' && (
				<Primes handlers={{ close, id: 'PRIME_GRATIF' }} />
			)}
			{modal_ID == 'DED_RETENUS' && (
				<Deductions handlers={{ close, id: 'DED_RETENUS' }} />
			)}
			{modal_ID == 'FAMILY_ALLOC' && (
				<Allocations handlers={{ close, id: 'FAMILY_ALLOC' }} />
			)}
			{modal_ID == 'PAYROLL' && (
				<GeneratePayroll handlers={{ close, id: 'PAYROLL' }} />
			)}

			{/* Social cases */}
			{modal_ID == 'UPDATE_SOCCASE' && (
				<UpdateSocCase handlers={{ close, id: 'UPDATE_SOCCASE' }} />
			)}

			{/* Articles */}
			{modal_ID == 'UPDATE_ARTICLE' && (
				<CreateAndUpdateArticle handlers={{ close, id: 'UPDATE_ARTICLE' }} />
			)}
			{modal_ID == 'NEW_ARTICLE' && (
				<CreateAndUpdateArticle handlers={{ close, id: 'NEW_ARTICLE' }} />
			)}
			{modal_ID == 'ORDER_ARTICLE' && (
				<CreateOrder handlers={{ close, id: 'ORDER_ARTICLE' }} />
			)}
			{modal_ID == 'UPDATE_UNITY' && (
				<CreateAndUpdateUnity handlers={{ close, id: 'UPDATE_UNITY' }} />
			)}
			{modal_ID == 'NEW_UNITY' && (
				<CreateAndUpdateUnity handlers={{ close, id: 'NEW_UNITY' }} />
			)}
			{modal_ID == 'UPDATE_CATEGORY' && (
				<CreateAndUpdateCategory handlers={{ close, id: 'UPDATE_CATEGORY' }} />
			)}
			{modal_ID == 'NEW_CATEGORY' && (
				<CreateAndUpdateCategory handlers={{ close, id: 'NEW_CATEGORY' }} />
			)}
			<></>
		</div>
	);
};

export default ModalManager;
