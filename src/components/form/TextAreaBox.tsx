import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TextAreaBoxProps = {
  name: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
};

const TextAreaBox = ({
  name,
  label,
  placeholder,
  fullWidth = true,
  required = false,
}: TextAreaBoxProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <Label htmlFor={name} className="text-[16px]">
        {label} {required && <span className="text-red-500 font-bold ">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              {...field}
              placeholder={placeholder}
              className={`w-full py-2 px-3 focus:outline-none mt-1 focus:border-primary ${
                error ? "border-red-400" : ""
              }`}
              rows={5}
            />
            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TextAreaBox;
