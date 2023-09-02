import { useContext } from 'react';
import { PaginationContext } from 'libs/contexts/PagiantionContext';

export const usePagination = () => useContext(PaginationContext);
