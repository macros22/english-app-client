import React from 'react';
import { IWord } from 'types/types';


export const WordMoreInfo = ({ rowData }: { rowData: IWord }): JSX.Element => {
    return (
        <>
            <p>{rowData.id}</p>
            <p>{rowData.word}</p>
            {rowData.definitions.map((definition, index) => {
                return <p key={definition + index}>{definition}</p>
            })}
            {rowData.translations.map((translation, index) => {
                return <p key={translation + index}>{translation}</p>
            })}
            {rowData.usageExamples.map((usageExample, index) => {
                return (<>
                    <p key={usageExample.sentence + index}>{usageExample.sentence}</p>
                    <p key={usageExample.translation + index}>{usageExample.translation}</p>
                </>)
            })}
        </>
    );
}