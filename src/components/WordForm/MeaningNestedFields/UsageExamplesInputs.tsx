import { Controller, useFieldArray } from "react-hook-form";
import { Button, Divider, Form, Header, Input } from "semantic-ui-react";
import { NestedFormInputsProps } from "./MeaningNestedFields.props";

export const UsageExamplesInputs = ({ meaningIndex, control }: NestedFormInputsProps): JSX.Element => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `meanings.${meaningIndex}.usageExamples`
    });

    return (
        <>
            <Divider horizontal>
                <Header as='h4'>
                    <Button icon='add' content={'Usage example'}
                        onClick={() =>
                            append({
                                usageExample: ''
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
                                name={`meanings.${meaningIndex}.usageExamples.${index}.usageExample`}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        size='large'
                                        value={value}
                                        onChange={onChange}
                                        label={`${index + 1}`}
                                        placeholder={`Usage example ${index + 1}`}
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