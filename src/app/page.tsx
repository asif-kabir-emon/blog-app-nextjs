"use client";
import BlogSkeleton from "@/components/shared/Loader/BlogSkeleton";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { ImageIcon, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  const { data: blogs, isLoading: isFetchingData } = useGetBlogsQuery({});

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
      <h2 className="text-2xl text-slate-600">Latest Posts</h2>
      {!blogs && <div className="mt-2 text-slate-400">No Post Available.</div>}

      {blogs && blogs.data && blogs.data.length > 0 && (
        <div className="space-y-3  mt-5">
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
                  className="border-[1px] p-3 rounded border-gray-300  hover:cursor-pointer shadow-sm"
                >
                  <Link href={`/blog/${blog.id}`} passHref>
                    <div className="flex flex-col md:flex-row gap-5">
                      {blog.imageUrl ? (
                        <Image
                          src={blog.imageUrl}
                          alt={blog.title}
                          width={300}
                          height={300}
                          className="w-full md:w-60 h-44 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full flex justify-center items-center md:w-60 h-44 bg-slate-200 rounded-md">
                          <ImageIcon className="w-12 h-12 text-slate-100" />
                        </div>
                      )}
                      <div className="space-y-2 flex-1 max-h-44 overflow-clip">
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
