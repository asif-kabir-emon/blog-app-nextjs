import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Months, Years } from "@/constants";

type SelectMonthYearProps = {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  watchFields?: string[];
};

const SelectMonthYear = ({
  name,
  label,
  required = false,
  disabled = false,
  watchFields = [],
}: SelectMonthYearProps) => {
  const { control } = useFormContext();
  watchFields?.map((field) => {
    disabled = disabled || useWatch({ control, name: field });
  });

  return (
    <div className="w-full">
      <Label htmlFor={name} className="text-[16px]">
        {label}
        {required && <span className="text-red-500 font-bold ">*</span>}
      </Label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Controller
            control={control}
            name={`${name}.month`}
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
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Months.map((item) => (
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
        <div className="flex-1">
          <Controller
            control={control}
            name={`${name}.year`}
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
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Years.map((item) => (
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
      </div>
    </div>
  );
};

export default SelectMonthYear;
