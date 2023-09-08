import { AppDispatcher } from '@/redux/store';
import { useDispatch } from 'react-redux';

type NewType = AppDispatcher;

export const useAppDispatch: () => NewType = useDispatch;
