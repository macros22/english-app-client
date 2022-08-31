import { WordLevel } from "libs/types/types";
import { Controller } from "react-hook-form";
import { Form } from "semantic-ui-react";
import { NestedFormSelectProps } from "./MeaningNestedFields.props";

const wordLevelOptions =
    Object.values(WordLevel).map(level => {
        return { key: level, value: level, text: level, label: { color: 'green', circular: true } }
    });

export const WordLevelSelect = ({ meaningIndex, control, setValue }: NestedFormSelectProps): JSX.Element => {
    return (
        <Controller
            name={`meanings.${meaningIndex}.level`}
            control={control}
            render={({ field }) =>
                <Form.Select
                    label={"Level"}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={(_, { value }) => setValue(`meanings.${meaningIndex}.level`, value ? value as WordLevel : WordLevel.Uncategorized)}
                    value={field.value?.toString()}
                    options={wordLevelOptions}
                />}
        />
    );
}