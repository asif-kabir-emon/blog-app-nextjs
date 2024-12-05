"use client";
import Form from "@/components/form/Form";
import InputBox from "@/components/form/InputBox";
import TextAreaBox from "@/components/form/TextAreaBox";
import Loading from "@/components/shared/Loader/Loading";
import { Button } from "@/components/ui/button";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import { ProfileSchema } from "@/schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const UpdateProfile = () => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const { data: profileData, isLoading: isFetchingData } = useGetProfileQuery(
    {},
  );

  if (isFetchingData) {
    return <Loading />;
  }

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Please Wait! Try to update profile.", {
      position: "top-center",
    });

    try {
      const response = await updateProfile(data).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Profile updated successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message || "Failed to update profile. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Failed to update profile. Please try again.",
        {
          id: toastId,
        },
      );
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-5 text-slate-600">
        Your Profile Information
      </h2>
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(ProfileSchema)}
        defaultValues={{
          name: profileData?.data?.name || "",
          bio: profileData?.data?.bio || "",
        }}
      >
        <div className="flex flex-col gap-3">
          <InputBox
            name="name"
            type="text"
            label="Name"
            placeholder="Enter your name"
          />
          <TextAreaBox name="bio" label="Bio" placeholder="Enter your bio" />
        </div>
        <Button
          type="submit"
          className="mt-5 w-full bg-black text-white border-[2px] border-black"
          disabled={isFetchingData || isUpdating}
        >
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;
