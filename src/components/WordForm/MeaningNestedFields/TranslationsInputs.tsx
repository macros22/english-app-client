import { Controller, useFieldArray } from "react-hook-form";
import { Button, Divider, Form, Header, Input } from "semantic-ui-react";
import { NestedFormInputsProps } from "./MeaningNestedFields.props";

export const TranslationsInputs = ({ meaningIndex, control }: NestedFormInputsProps): JSX.Element => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `meanings.${meaningIndex}.translations`
    });

    return (
        <>
            <Divider horizontal>
                <Header as='h4'>
                    <Button icon='add' content={'Translations'}
                        onClick={() =>
                            append({
                                translation: '',
                            })
                        }
                    />
                </Header>
            </Divider>
            {
                fields.map((_, index) => {
                    return (
                        <Form.Field>
                            <Controller
                                name={`meanings.${meaningIndex}.translations.${index}.translation`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        size='large'
                                        value={value}
                                        onChange={onChange}
                                        label={`${index + 1}`}
                                        placeholder={`translation ${index + 1}`}
                                        action={<Button icon='trash' size='large' color='red'
                                            onClick={() => remove(index)}
                                        />}
                                    />
                                )}
                            />

                        </Form.Field>
                    );
                })
            }</>
    );
}