import React from "react";
import styles from './AlphabetSearch.module.scss';
import { usePagination } from "libs/hooks";
import { Label, Loader, Segment } from "semantic-ui-react";
import { alphabet } from "libs/constants/alphabet";
import { usePageByLetter } from "libs/hooks/usePageByLetter";

export const AlphabetSearch = (): JSX.Element => {

    const {
        setSkip,
        wordsPerPageCount,
    } = usePagination();

    const [activeLetterIndex, setActiveLetterIndex] = React.useState<number | null>(null);

    const { page, isPageLoading, pageError } = usePageByLetter({
            letter: alphabet[activeLetterIndex || 0],
            limit: wordsPerPageCount,
        }
        // alphabet[activeLetterIndex || 0],
        // wordsPerPageCount,
    )

    React.useEffect(() => {
        if (page > 1) {
            setSkip((page - 1) * wordsPerPageCount)
        }
    }, [page])

    if (isPageLoading && activeLetterIndex !== null) {
        return (
            <Segment>
                <Loader size='massive' active inline='centered' />
            </Segment>
        );
    }

    return (
        <Label.Group className={styles.wrapper} >
            {alphabet.map((letter, index) => {
                return (
                    <Label
                        className={styles.letter}
                        size="big"
                        key={letter}
                        color={activeLetterIndex === index ? "blue" : undefined}
                        onClick={() => setActiveLetterIndex(index)}
                    >
                        {letter}
                    </Label>
                )
            })
            }
        </Label.Group >
    )
}