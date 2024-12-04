import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageUp, Plus } from "lucide-react";

type InputImagesProps = {
  name: string;
  label?: string;
  fullWidth?: boolean;
  required?: boolean;
};

const InputImages = ({
  name,
  label,
  fullWidth = true,
  required = false,
}: InputImagesProps) => {
  const { control, setValue, getValues } = useFormContext();

  const handleAddImage = (newFiles: File[]) => {
    const existingFiles = getValues(name) || [];
    setValue(name, [...existingFiles, ...newFiles]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const existingFiles = getValues(name) || [];
    const updatedFiles = existingFiles.filter(
      (_: File, index: number) => index !== indexToRemove,
    );
    setValue(name, updatedFiles);
  };

  return (
    <div>
      <Label htmlFor={name} className="text-[16px]">
        {label} {required && <span className="text-red-500 font-bold ">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            {/* <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleAddImage(files);
                e.target.value = "";
              }}
              className={`w-full py-2 px-3 focus:outline-none mt-1 focus:border-primary ${
                error ? "border-red-400" : ""
              }`}
            /> */}
            <Input
              type="file"
              accept="image/*"
              multiple
              id={`${name}-file-input`}
              style={{ display: "none" }}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleAddImage(files);
                e.target.value = "";
              }}
            />

            <div>
              <Button
                type="button"
                onClick={() =>
                  document.getElementById(`${name}-file-input`)?.click()
                }
                className={`mt-1 text-sm px-6 rounded-xl bg-slate-600 hover:bg-gray-400 ${
                  error ? "border-red-400" : ""
                }`}
              >
                <ImageUp /> Add Images
              </Button>
            </div>

            {/* Display uploaded images */}
            <div className="mt-2 flex flex-wrap gap-2">
              {(value || []).map((file: File, index: number) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded-md overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-[2px] right-[2px] p-1 bg-red-500 bg-opacity-80 px-[6px] py-[1px] text-white rounded-full text-xs"
                  >
                    x
                  </button>
                </div>
              ))}
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

export default InputImages;
