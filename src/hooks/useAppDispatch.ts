import { AppDispatcher } from '@/redux/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatcher = useDispatch;
