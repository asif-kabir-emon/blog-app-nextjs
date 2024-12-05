"use client";
import BlogSkeleton from "@/components/shared/Loader/BlogSkeleton";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  const { data: blogs, isLoading: isFetchingData } = useGetBlogsQuery({});
  const blog = {};

  if (isFetchingData) {
    return (
      <div className="space-y-3 max-w-screen-xl mx-auto">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index}>
            <BlogSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl my-5 mx-auto">
      {!blog && <div className="text-center ">No Blogs Found</div>}

      {blogs && blogs.data && blogs.data.length > 0 && (
        <div className="space-y-4">
          {!isFetchingData &&
            blogs &&
            blogs.data &&
            blogs.data.map(
              (blog: {
                id: string;
                imageUrl: string;
                title: string;
                content: string;
                createdAt: string;
                user: {
                  profile: {
                    name: string;
                  };
                };
              }) => (
                <div
                  key={blog.id}
                  className="border-[1px] p-3 rounded border-slate-100 max-h-[350px] md:max-h-[200px] overflow-hidden hover:cursor-pointer"
                >
                  <Link href={`/blog/${blog.id}`} passHref>
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="">
                        <Image
                          src={blog.imageUrl}
                          alt={blog.title}
                          width={300}
                          height={300}
                          className="w-full h-40 md:h-44 object-cover rounded"
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h1 className="text-xl md:text-2xl font-bold">
                          {blog.title}
                        </h1>
                        <div className="flex gap-2">
                          <div className="border-[5px] border-slate-200 rounded-full bg-slate-200">
                            <UserRound className="w-7 h-7 text-slate-400 rounded-full" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-slate-700">
                              {blog.user.profile.name}
                            </span>
                            <span className="text-sm text-slate-500">
                              {new Intl.DateTimeFormat("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }).format(new Date(blog.createdAt))}
                            </span>
                          </div>
                        </div>
                        <div
                          className="prose pt-3"
                          dangerouslySetInnerHTML={{
                            __html: blog.content,
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ),
            )}
        </div>
      )}
    </div>
  );
};

export default Home;
