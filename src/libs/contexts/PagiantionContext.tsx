import { CURRENT_TABLE_PAGE } from "libs/constants/names.storage";
import { useLocalStorage } from "libs/hooks";
import React, { Dispatch, SetStateAction, useContext, useMemo } from "react";
import { createContext, FC } from "react";

interface IPaginationContext {
    skip: number;
    setSkip: Dispatch<SetStateAction<number>>,
    wordsPerPageCount: number;
    setWordsPerPageCount: Dispatch<SetStateAction<number>>,
}
export const PaginationContext = createContext<IPaginationContext>({} as IPaginationContext)

export const PaginationProvider: FC = ({ children }) => {

    const [skip, setSkip] = React.useState(0);
    // const [skip, setSkip] = useLocalStorage<number>(CURRENT_TABLE_PAGE + mode, 0);

    const [wordsPerPageCount, setWordsPerPageCount] = React.useState(0);
    // const value = useMemo(() => ({
    //     skip,
    //     setSkip,
    //     wordsPerPageCount,
    //     setWordsPerPageCount,
    // }), [skip, wordsPerPageCount]);

    const value = {
        skip,
        setSkip,
        wordsPerPageCount,
        setWordsPerPageCount,
    };

    return (
        <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
    )
}