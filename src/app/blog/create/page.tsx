"use client";
import Form from "@/components/form/Form";
import InputBox from "@/components/form/InputBox";
import { zodResolver } from "@hookform/resolvers/zod";
import InputImage from "@/components/form/InputImage";
import TextEditor from "@/components/form/TextEditor";
import { Button } from "@/components/ui/button";
import { useCreateBlogMutation } from "@/redux/api/blogApi";
import { modifyPayload } from "@/utils/modifyPayload";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { BlogSchema } from "@/schema/blog.schema";
import { useRouter } from "next/navigation";

const AddBlog = () => {
  const router = useRouter();
  const [addBlog, { isLoading: isCreating }] = useCreateBlogMutation();

  const onSubmit = async (data: FieldValues) => {
    const uploadedImages = data.image ? data.image : null;
    delete data.image;

    const payload = {
      ...data,
      file: uploadedImages,
    };
    const modifiedData = modifyPayload(payload);

    const toastId = toast.loading("Please Wait! Try to add new Blog.", {
      position: "top-center",
    });

    try {
      const response = await addBlog(modifiedData).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Blog added successfully.", {
          id: toastId,
        });
      } else {
        throw new Error(
          response?.message || "Failed to add blog. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to add blog. Please try again.", {
        id: toastId,
      });
    } finally {
      router.push(`/blog/my-blogs`);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-slate-500">Create Blog</h2>
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(BlogSchema)}
        defaultValues={{
          title: "",
          content: "",
          image: "",
        }}
      >
        <div className="flex flex-col gap-3">
          <InputBox
            name="title"
            type="text"
            label="Title"
            placeholder="Enter blog title"
          />
          <InputImage name="image" label="Blog Image" />
          <TextEditor
            name="content"
            label="Blog Content"
            placeholder="Write your code here"
          />
        </div>
        <Button
          type="submit"
          className="mt-5 w-full bg-black text-white border-[2px] border-black"
          disabled={isCreating}
        >
          Create Blog
        </Button>
      </Form>
    </div>
  );
};

export default AddBlog;
