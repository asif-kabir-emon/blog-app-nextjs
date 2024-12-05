"use client";
import Loading from "@/components/shared/Loader/Loading";
import { Button } from "@/components/ui/button";
import { useGetBlogByIdQuery } from "@/redux/api/blogApi";
import { PenLine, UserRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authKey } from "@/constants";
import { validateToken } from "@/utils/validateToken";
import { jwtDecode } from "jwt-decode";

type BlogProps = {
  params: {
    blogId: string;
  };
};

const Blog = ({ params }: BlogProps) => {
  const { blogId } = params;
  const router = useRouter();
  const [isAuthor, setIsAuthor] = useState(false);

  const { data: blogs, isLoading: isFetchingData } =
    useGetBlogByIdQuery(blogId);

  useEffect(() => {
    const checkAuthor = async (userId: string) => {
      const token = Cookies.get(authKey);
      if (token) {
        const user = jwtDecode(token) as jwtPayload;

        if (user && user.id) {
          const isValid = user.id === userId ? false : true;
          setIsAuthor(isValid);
        }
      }
    };

    if (
      !isFetchingData &&
      blogs &&
      blogs.data &&
      blogs.data.user &&
      blogs.data.user.id
    ) {
      console.log(blogs);
      console.log(blogs.data.user.id);
      checkAuthor(blogs.data.user.id);
    }
  }, [isFetchingData, blogs]);

  if (isFetchingData) {
    return <Loading />;
  }

  return (
    <div>
      {!isFetchingData && blogs && blogs.data && blogs.data.imageUrl && (
        <div className="mb-5 max-w-screen-lg mx-auto space-y-4">
          <h1 className="text-4xl font-semibold leading-10 tracking-wide">
            {blogs.data.title}
          </h1>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-row items-center gap-4">
              <div className="border-[6px] border-slate-200 rounded-full bg-slate-200">
                <UserRound className="w-8 h-8 text-slate-400 rounded-full" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-md">{blogs.data.user.profile.name}</h4>
                <p className="text-sm text-gray-500">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(blogs.data.createdAt))}
                </p>
              </div>
            </div>
            <Button
              className={`bg-black text-white border-[2px] border-black ${
                isAuthor ? "hidden" : ""
              }`}
              onClick={() => router.push(`/blog/${blogId}/edit`)}
              disabled={isAuthor}
            >
              <PenLine className="w-5 h-5" />
              Update
            </Button>
          </div>
          <Image
            src={blogs.data.imageUrl}
            alt={blogs.data.title}
            width={300}
            height={200}
            className="cover w-full h-96 object-cover"
          />
          <div
            className="prose max-w-none pt-3"
            dangerouslySetInnerHTML={{ __html: blogs.data.content }}
          />
        </div>
      )}
    </div>
  );
};

export default Blog;
