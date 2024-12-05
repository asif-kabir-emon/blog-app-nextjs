import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const Route_URL = "/profile";

export const BlogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `${Route_URL}`,
        method: "GET",
      }),
      providesTags: [TagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: (data: any) => ({
        url: `${Route_URL}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [TagTypes.profile],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = BlogApi;
