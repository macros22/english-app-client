import React from 'react';
import { IWord } from 'types/types';

export const WordMoreInfo = ({ rowData }: { rowData: IWord }): JSX.Element => {
    return (
        <>
            <h3>Engish word:</h3>
            <p>{rowData.word}</p>

            {rowData.transcription &&
                <>
                    <h3>Transcription:</h3>
                    <p>{rowData.transcription}</p>
                </>
            }

            {rowData.definitions && rowData.definitions?.length &&
                <>
                    <h3>Definitions:</h3>
                    {rowData.definitions.map((definition, index) => {
                        return <p key={definition + index}>{definition}</p>
                    })}
                </>
            }
            {rowData.translations && rowData.translations?.length &&
                <>
                    <h3>Translations:</h3>
                    {rowData.translations.map((translation, index) => {
                        return <p key={translation + index}>{translation}</p>
                    })}
                </>
            }
            {rowData.usageExamples && rowData.translations?.length &&
                <>
                    <h3>Usage examples:</h3>
                    {rowData.usageExamples.map((usageExample, index) => {
                        return (<>
                            <p key={usageExample.sentence + index}>{usageExample.sentence}</p>
                            {usageExample.translation &&
                                <p key={usageExample.translation + index}>{usageExample.translation}</p>
                            }
                        </>)
                    })}
                </>
            }
        </>
    );
}