import { Tag } from "@/types/tag/tag.types";
import { apiRoutes } from "../core/apiRoutes";
import { api } from "../core/baseApi";

const resourcePath = `/${apiRoutes.TAGS.BASE}`;

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchTags: builder.query<Tag[], void>({
      query: () => ({
        url: resourcePath,
        method: "GET",
      }),
      providesTags: (result: Tag[] | undefined) =>
        result
          ? [
              { type: "Tags" as const, id: "LIST" },
              ...result.map((t) => ({ type: "Tags" as const, id: t.id })),
            ]
          : [{ type: "Tags" as const, id: "LIST" }],
    }),

    fetchTagById: builder.query<Tag, Tag["id"]>({
      query: (tagId: Tag["id"]) => ({
        url: `${resourcePath}/${apiRoutes.TAGS.ID}/${tagId}`,
        method: "GET",
      }),
      providesTags: (
        _result: Tag | undefined,
        _error: unknown,
        tagId: Tag["id"],
      ) => [{ type: "Tags", id: tagId }],
    }),

    addTags: builder.mutation<Tag[], Tag["name"][]>({
      query: (tagData: Tag["name"][]) => ({
        url: resourcePath,
        method: "POST",
        data: tagData,
      }),
      invalidatesTags: [{ type: "Tags", id: "LIST" }],
    }),

    updateTagById: builder.mutation<Tag, { id: Tag["id"]; name: Tag["name"] }>({
      query: ({ id, name }: { id: Tag["id"]; name: Tag["name"] }) => ({
        url: `${resourcePath}/${apiRoutes.TAGS.ID}/${id}`,
        method: "PUT",
        data: { name },
      }),
      invalidatesTags: (
        _result: Tag | undefined,
        _error: unknown,
        { id }: { id: Tag["id"] },
      ) => [
        { type: "Tags", id },
        { type: "Tags", id: "LIST" },
      ],
    }),

    deleteTagById: builder.mutation<void, Tag["id"]>({
      query: (tagId: Tag["id"]) => ({
        url: `${resourcePath}/${apiRoutes.TAGS.ID}/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: (
        _result: void | undefined,
        _error: unknown,
        tagId: Tag["id"],
      ) => [
        { type: "Tags", id: tagId },
        { type: "Tags", id: "LIST" },
      ],
    }),

    deleteTagByName: builder.mutation<void, Tag["name"]>({
      query: (tagName: Tag["name"]) => ({
        url: `${resourcePath}/${apiRoutes.TAGS.NAME}/${tagName}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tags", id: "LIST" }],
    }),

    searchTagsByName: builder.query<Tag[], string>({
      query: (tagName: Tag["name"]) => ({
        url: `${resourcePath}/${apiRoutes.TAGS.NAME}`,
        method: "GET",
        params: { tags: tagName },
      }),
      providesTags: (result: Tag[] | undefined) =>
        result ? result.map((t) => ({ type: "Tags" as const, id: t.id })) : [],
    }),
  }),
});

export const {
  useFetchTagsQuery,
  useFetchTagByIdQuery,
  useAddTagsMutation,
  useUpdateTagByIdMutation,
  useDeleteTagByIdMutation,
  useDeleteTagByNameMutation,
  useSearchTagsByNameQuery,
} = tagsApi;
