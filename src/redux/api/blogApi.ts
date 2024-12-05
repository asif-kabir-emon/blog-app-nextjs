import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/blogs";

export const BlogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.blog],
    }),
    getMyBlogs: build.query({
      query: () => ({
        url: `${Route_URL}/my-blogs`,
        method: "GET",
      }),
      providesTags: [TagTypes.blog],
    }),
    getBlogById: build.query({
      query: (id: string) => ({
        url: `${Route_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.blog],
    }),
    createBlog: build.mutation({
      query: (data: any) => ({
        url: `${Route_URL}`,
        contentType: "multipart/form-data",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [TagTypes.blog],
    }),
    updateBlog: build.mutation({
      query: ({ id, body }) => ({
        url: `${Route_URL}/${id}`,
        contentType: "multipart/form-data",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [TagTypes.blog],
    }),
    deleteBlog: build.mutation({
      query: (id: string) => ({
        url: `${Route_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.blog],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetMyBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = BlogApi;
