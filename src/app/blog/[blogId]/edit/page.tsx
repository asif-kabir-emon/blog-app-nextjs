"use client";
import Form from "@/components/form/Form";
import InputBox from "@/components/form/InputBox";
import InputImage from "@/components/form/InputImage";
import TextEditor from "@/components/form/TextEditor";
import Loading from "@/components/shared/Loader/Loading";
import { Button } from "@/components/ui/button";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
import { BlogSchema } from "@/schema/blog.schema";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type EditBlogProps = {
  params: {
    blogId: string;
  };
};

const EditBlog = ({ params }: EditBlogProps) => {
  const router = useRouter();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const { blogId } = params;
  const { data: blogs, isLoading: isFetchingData } =
    useGetBlogByIdQuery(blogId);

  if (isFetchingData) {
    return <Loading />;
  }

  console.log(blogs);

  const onSubmit = async (data: FieldValues) => {
    const uploadedImages = data.image ? data.image : null;
    delete data.image;

    const payload = {
      ...data,
      file: uploadedImages,
    };
    const modifiedData = modifyPayload(payload);

    const toastId = toast.loading("Please Wait! Try to update blog.", {
      position: "top-center",
    });

    try {
      const response = await updateBlog({
        id: blogId,
        body: modifiedData,
      }).unwrap();

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
      router.push(`/blog/${blogId}`);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-5 text-slate-600">
        Update Blog Data
      </h2>
      {!isFetchingData && blogs && blogs.data && blogs.data.imageUrl && (
        <div className="mb-5">
          <Image
            src={blogs.data.imageUrl}
            alt={blogs.data.title}
            width={300}
            height={200}
            className="cover w-full h-36 object-cover"
          />
        </div>
      )}
      <Form
        onSubmit={onSubmit}
        resolver={zodResolver(BlogSchema)}
        defaultValues={{
          title: blogs.data.title || "",
          content: blogs.data.content || "",
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
          disabled={isFetchingData || isUpdating}
        >
          Update Blog
        </Button>
      </Form>
    </div>
  );
};

export default EditBlog;
