import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  UseFormProps,
} from "react-hook-form";

type FormConfig = UseFormProps<FieldValues>;

type FormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  isClear?: boolean;
} & FormConfig;

const Form = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  isClear = false,
}: FormProps) => {
  const formConfig: UseFormProps<FieldValues> = {};
  if (resolver) {
    formConfig.resolver = resolver;
  }
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    if (isClear) {
      reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
