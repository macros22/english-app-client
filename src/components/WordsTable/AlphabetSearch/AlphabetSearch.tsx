import React from "react";
import { Label } from "semantic-ui-react";
import styles from './AlphabetSearch.module.scss';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const AlphabetSearch = (): JSX.Element => {

    const [activeLetterIndex, setActiveLetterIndex] = React.useState<number | null>(null);
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