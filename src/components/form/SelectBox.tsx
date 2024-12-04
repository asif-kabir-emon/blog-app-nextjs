import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectBoxProps = {
  name: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  items: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
};

const SelectBox = ({
  name,
  label,
  placeholder,
  fullWidth = true,
  required = false,
  items = [],
  disabled = false,
}: SelectBoxProps) => {
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
            <Select
              {...field}
              value={field.value || ""}
              onValueChange={(value) => field.onChange(value)}
              disabled={disabled}
            >
              <SelectTrigger
                className={`w-full py-2 px-3 focus:outline-none mt-1 focus:border-primary ${
                  error ? "border-red-400" : ""
                }`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error && (
              <span className="text-red-500 text-sm">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SelectBox;
