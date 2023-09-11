import { configureStore } from '@reduxjs/toolkit';
import agentFilesReducer from './agent-files/agent-files.slice';
import agentReducer from './agents/agents.slice';
import articleReducer from './article/article.slice';
import articleUnityReducer from './article-unity/article-unity.slice';
import attendencyReducer from './attendency/attendency.slice';
import authReducer from './auth/auth.slice';
import congeReducer from './conge/conge.slice';
import folderElementReducer from './folder-element/folder-element.slice';
import gradeReducer from './grade/grade.slice';
import immobReducer from './immobilisations/immob.slice';
import inventaireReducer from './inventaire/inventaire.slice';
import orderReducer from './order/order.slice';
import propertyCatedReducer from './property-category/category.slice';
import remunerationReducer from './remuneration/remuneration.slice';
import roleReducer from './roles/role.slice';
import serviceReducer from './service-section/section.slice';
import subscriptionReducer from './soc-case-subscription/subscription.slice';
import socialCaseReducer from './social-case/social-case.slice';

const store = configureStore({
	reducer: {
		agentFiles: agentFilesReducer,
		agents: agentReducer,
		articles: articleReducer,
		articleUnity: articleUnityReducer,
		attendency: attendencyReducer,
		auth: authReducer,
		conges: congeReducer,
		folderElement: folderElementReducer,
		grade: gradeReducer,
		immobs: immobReducer,
		inventaire: inventaireReducer,
		order: orderReducer,
		category: propertyCatedReducer,
		remuneration: remunerationReducer,
		role: roleReducer,
		service: serviceReducer,
		subscription: subscriptionReducer,
		socialCase: socialCaseReducer,
	},
});

export default store;
export type AppDispatcher = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
