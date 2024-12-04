"use client";
import Form from "@/components/form/Form";
import InputBox from "@/components/form/InputBox";
import InputImage from "@/components/form/InputImage";
import TextEditor from "@/components/form/TextEditor";
import { Button } from "@/components/ui/button";
import React from "react";
import { FieldValues } from "react-hook-form";

const AddBlog = () => {
  const onSubmit = async (data: FieldValues) => {};

  return (
    <div>
      <h2 className="text-xl font-bold mb-5">Create Blog</h2>
      <Form
        onSubmit={onSubmit}
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
          disabled={false}
        >
          Create Blog
        </Button>
      </Form>
    </div>
  );
};

export default AddBlog;
