import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type InputImageProps = {
  name: string;
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
};

const InputImage = ({
  name,
  label,
  fullWidth = true,
  required = false,
}: InputImageProps) => {
  const { control, setValue } = useFormContext();
  const [fileName, setFileName] = useState<string | null>(null);

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
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue(name, file);
                  setFileName(file.name);
                } else {
                  setFileName(null);
                }
              }}
              className={`w-full py-2 px-3 focus:outline-none mt-1 focus:border-primary ${
                error ? "border-red-400" : ""
              }`}
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

export default InputImage;
