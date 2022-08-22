import { PaginationContext } from "libs/contexts/PagiantionContext";
import { useContext } from "react";

export const usePagination = () => useContext(PaginationContext);