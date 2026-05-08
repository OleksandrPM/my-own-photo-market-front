/* This file should be similar to the apiRoutes.ts file in the server, 
but it should only include the routes that are relevant to the client. 
This is to avoid importing server-specific routes that are not needed on the client.*/

export const apiRoutes = {
  DOCS: { BASE: "docs" },
  SETUP: {
    BASE: "setup",
    ENABLED: "enabled",
    VERIFY_EMAIL: "verify-email",
    CONFIRM_EMAIL: "confirm-email",
    STATUS: "status",
    INITIAL_ADMIN: "initial-admin",
  },
  AUTH: {
    BASE: "auth",
    REGISTER: "register",
    LOGIN: "login",
    VERIFY_EMAIL: "verify-email",
    REFRESH: "refresh",
    LOGOUT: "logout",
    ME: "me",
  },
  USERS: { BASE: "users" },
  IMAGES: { BASE: "images" },
  TAGS: { BASE: "tags", ID: "id", NAME: "name" },
  IMAGE_TAGS: { BASE: "image-tags" },
  FAVORITES: { BASE: "favorites" },
} as const;

// /auth
//   POST /forgot-password
//   POST /reset-password
//   POST /2fa/enable
//   POST /2fa/verify
//   POST /2fa/disable

// /users
//   GET /me
//   PATCH /me
//   PATCH /me/email
//   PATCH /me/password
//   DELETE /me
