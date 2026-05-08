import { api } from "../core/baseApi";
import { apiRoutes } from "../core/apiRoutes";
import {
  SetupCreateAdminResponseDto,
  SetupEnabledResponseDto,
  SetupStatusResponseDto,
} from "@/types/setup";
import { InitialAdminValues } from "@/lib/forms/schemas/setup";

const resourcePath = `/${apiRoutes.SETUP.BASE}`;

export const setupApi = api.injectEndpoints({
  endpoints: (builder) => ({
    checkSetupEnabled: builder.query<
      SetupEnabledResponseDto["isSetupEnabled"],
      void
    >({
      query: () => ({
        url: `${resourcePath}/${apiRoutes.SETUP.ENABLED}`,
        method: "GET",
      }),
      transformResponse: (res: SetupEnabledResponseDto) => res.isSetupEnabled,
      providesTags: ["Setup"],
    }),

    verifyEmail: builder.mutation<void, InitialAdminValues["email"]>({
      query: (email: InitialAdminValues["email"]) => ({
        url: `${resourcePath}/${apiRoutes.SETUP.VERIFY_EMAIL}`,
        method: "POST",
        data: { email },
      }),
    }),

    getSetupStatus: builder.query<SetupStatusResponseDto, void>({
      query: () => ({
        url: `${resourcePath}/${apiRoutes.SETUP.STATUS}`,
        method: "GET",
      }),
      providesTags: ["Setup"],
    }),

    createInitialAdmin: builder.mutation<
      SetupCreateAdminResponseDto,
      InitialAdminValues
    >({
      query: (body: InitialAdminValues) => ({
        url: `${resourcePath}/${apiRoutes.SETUP.INITIAL_ADMIN}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Setup"],
    }),
  }),
});

export const {
  useCheckSetupEnabledQuery,
  useVerifyEmailMutation,
  useGetSetupStatusQuery,
  useCreateInitialAdminMutation,
} = setupApi;
