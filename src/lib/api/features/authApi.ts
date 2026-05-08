import { api } from "../core/baseApi";
import { apiRoutes } from "../core/apiRoutes";
import type { SignInValues } from "@/lib/forms/schemas";
import type { AuthResponseDto } from "@/types/auth/auth-response.dto";

const resourcePath = `/${apiRoutes.AUTH.BASE}`;

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<AuthResponseDto, void>({
      query: () => ({
        url: `${resourcePath}/${apiRoutes.AUTH.ME}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    register: builder.mutation<AuthResponseDto, FormData>({
      query: (formData: FormData) => ({
        url: `${resourcePath}/${apiRoutes.AUTH.REGISTER}`,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<AuthResponseDto, SignInValues>({
      query: (body: SignInValues) => ({
        url: `${resourcePath}/${apiRoutes.AUTH.LOGIN}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${resourcePath}/${apiRoutes.AUTH.LOGOUT}`,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useMeQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
