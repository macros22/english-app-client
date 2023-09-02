import { Controller } from 'react-hook-form';
import { PartOfSpeech } from 'libs/types/types';
import { Form } from 'semantic-ui-react';

import { NestedFormSelectProps } from './MeaningNestedFields.props';

const partOfSpeechOptions = Object.values(PartOfSpeech).map(pos => {
  return {
    key: pos,
    value: pos,
    text: pos,
    label: { color: 'green', circular: true },
  };
});

export const PartOfSpeechSelect = ({
  meaningIndex,
  control,
  setValue,
}: NestedFormSelectProps): JSX.Element => {
  return (
    <Controller
      name={`meanings.${meaningIndex}.pos`}
      control={control}
      render={({ field }) => (
        <Form.Select
          label="Part of speech"
          name={field.name}
          ref={field.ref}
          onBlur={field.onBlur}
          onChange={(_, { value }) =>
            setValue(
              `meanings.${meaningIndex}.pos`,
              value ? (value as PartOfSpeech) : PartOfSpeech.Noun,
            )
          }
          value={field.value?.toString()}
          options={partOfSpeechOptions}
        />
      )}
    />
  );
};
