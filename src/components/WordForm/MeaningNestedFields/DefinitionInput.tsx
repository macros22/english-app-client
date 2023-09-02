import { Controller } from 'react-hook-form';
import { Form } from 'semantic-ui-react';

import { NestedFormInputsProps } from './MeaningNestedFields.props';

export const DefinitionInput = ({
  meaningIndex,
  control,
}: NestedFormInputsProps): JSX.Element => {
  return (
    <Controller
      name={`meanings.${meaningIndex}.definition`}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Form.Input
          size="large"
          value={value}
          onChange={onChange}
          label="Definition"
          placeholder="Definition"
        />
      )}
    />
  );
};
