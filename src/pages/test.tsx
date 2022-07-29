
import { defaultFormValues } from "components/AddWord/constants";
import * as React from "react";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { IWordFormValues } from "types/forms";

type FormValues = {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
  dart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "cart",
    control
  });
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IWordFormValues>({
    defaultValues: defaultFormValues,
    mode: "onBlur"
  });
  const { fields, append, remove } = useFieldArray({
    name: "usageExamples",
    control
  });
  // const { fields: f, append: a, remove: r } = useFieldArray({
  //   name: "dart",
  //   control
  // });
  const onSubmit = (data: IWordFormValues) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <input
                  placeholder="name"
                  {...register(`usageExamples.${index}.sentence` as const, {
                    required: true
                  })}
                  className={errors?.usageExamples?.[index]?.sentence ? "error" : ""}
                />
                <input
                  placeholder="quantity"
                  // type="number"
                  {...register(`usageExamples.${index}.translation` as const, {
                    // valueAsNumber: true,
                    required: true
                  })}
                  className={errors?.usageExamples?.[index]?.translation ? "error" : ""}
                />
                
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}

        {/* <Total control={control} /> */}

        <button
          type="button"
          onClick={() =>
            append({
              // name: "",
              // quantity: 0,
              // price: 0
            })
          }
        >
          APPEND
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
