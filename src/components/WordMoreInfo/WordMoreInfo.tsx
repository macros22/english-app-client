import React from 'react';
import { IWord } from 'libs/types/types';

export const WordMoreInfo = ({ rowData }: { rowData: IWord }): JSX.Element => {
    return (
        <>
            <h2>Engish word:</h2>
            <h3>{rowData.word}</h3>

            <span>{rowData.level}</span>

            {rowData.transcription.uk &&
                <>
                    <h2>UK:</h2>
                    <span>{rowData.transcription.uk}</span>
                </>
            }
            {rowData.transcription.us &&
                <>
                    <h2>US:</h2>
                    <span>{rowData.transcription.us}</span>
                </>
            }

            {Boolean(rowData.definitions.length) &&
                <>
                    <h2>Definitions:</h2>
                    {rowData.definitions.map((definition, index) => {
                        return <h3 key={definition + index}>{definition}</h3>
                    })}
                </>
            }
            {Boolean(rowData.translations.length) &&
                <>
                    <h2>Translations:</h2>
                    {rowData.translations.map((translation, index) => {
                        return <h3 key={translation + index}>{translation}</h3>
                    })}
                </>
            }
            {Boolean(rowData.synonyms.length) &&
                <>
                    <h2>Synonyms:</h2>
                    {rowData.synonyms.map((synonym, index) => {
                        return <h3 key={synonym + index}>{synonym}</h3>
                    })}
                </>
            }
            {Boolean(rowData.antonyms.length) &&
                <>
                    <h2>Antonyms:</h2>
                    {rowData.antonyms.map((antonym, index) => {
                        return <h3 key={antonym + index}>{antonym}</h3>
                    })}
                </>
            }
            {Boolean(rowData.usageExamples.length) &&
                <>
                    <h2>Usage examples:</h2>
                    {rowData.usageExamples.map((usageExample, index) => {
                        return (<>
                            <h3 key={usageExample.sentence + index}>{usageExample.sentence}</h3>
                            {usageExample.translation &&
                                <h3 key={usageExample.translation + index}>{usageExample.translation}</h3>
                            }
                        </>)
                    })}
                </>
            }
        </>
    );
}