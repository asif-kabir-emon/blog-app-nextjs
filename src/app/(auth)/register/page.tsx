"use client";
import Form from "@/components/form/Form";
import InputBox from "@/components/form/InputBox";
import { Button } from "@/components/ui/button";
import { authKey } from "@/constants";
import { Separator } from "@radix-ui/react-separator";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating User Account", {
      position: "top-center",
    });
    setLoading(true);

    const name = data.name;
    const email = data.email;
    const password = data.password;

    if (!email || !password || !name) {
      toast.error("Name, Email and Password are required", {
        id: toastId,
        duration: 2000,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res?.message);
      }
      const cookieExpiresIn = new Date(new Date().getTime() + 120 * 60 * 1000);

      Cookies.set(authKey, res.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
        expires: cookieExpiresIn,
      });

      toast.success("User account created successfully.", {
        id: toastId,
        duration: 2000,
      });

      router.push("/blog/my-blogs");
    } catch (error: any) {
      toast.error(error?.message || "Failed to create user account.", {
        id: toastId,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="shadow-sm border-[1px] border-black rounded-xl p-5 min-w-72 md:min-w-96 my-10 md:my-20">
        <h1 className="text-2xl font-bold text-center mb-5">Create Account</h1>
        <Form
          onSubmit={onSubmit}
          defaultValues={{
            name: "",
            email: "",
            password: "",
          }}
        >
          <div className="flex flex-col gap-2">
            <InputBox
              name="name"
              type="text"
              label="Name"
              placeholder="Enter Full Name"
            />
            <InputBox
              name="email"
              type="text"
              label="Email"
              placeholder="Enter Email"
            />
            <InputBox
              name="password"
              type="password"
              label="Password"
              placeholder="Enter Password"
            />
          </div>
          <Button
            type="submit"
            className="mt-3 w-full bg-black text-white border-[2px] border-black"
            disabled={loading}
          >
            Register
          </Button>
        </Form>
        <Separator className="my-5 font-xl" />
        <div>
          <p className="text-center">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
