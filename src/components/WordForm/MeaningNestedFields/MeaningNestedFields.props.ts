import { Control, UseFormSetValue } from 'react-hook-form';
import { IWordFormValues } from 'libs/types/forms';

export interface NestedFormInputsProps {
  control: Control<IWordFormValues, any>;
  meaningIndex: number;
}

export interface NestedFormSelectProps {
  control: Control<IWordFormValues, any>;
  meaningIndex: number;
  setValue: UseFormSetValue<IWordFormValues>;
}
