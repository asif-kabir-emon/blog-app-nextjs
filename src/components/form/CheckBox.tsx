import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Checkbox } from "@radix-ui/react-checkbox";

type CheckBoxProps = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
};

const CheckBox = ({
  name,
  type = "text",
  label,
  placeholder,
  required = false,
}: CheckBoxProps) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? `${label || "This field"} is required` : false,
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="flex space-x-2">
              <input
                {...field}
                id={name}
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="peer w-5 h-5 border border-gray-400 rounded checked:bg-black checked:border-black focus:ring-0 focus:ring-slate-400"
              />

              <Label htmlFor={name} className="text-[16px]">
                {label}
              </Label>
            </div>
            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default CheckBox;
