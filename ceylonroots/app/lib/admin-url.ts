const DEFAULT_ADMIN_HOST = "admin.localhost";
const DEFAULT_ADMIN_PORT = "3001";

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const getAdminDashboardUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (typeof window === "undefined") {
    return `http://${DEFAULT_ADMIN_HOST}:${DEFAULT_ADMIN_PORT}`;
  }

  const { protocol } = window.location;

  return `${protocol}//${DEFAULT_ADMIN_HOST}:${DEFAULT_ADMIN_PORT}`;
};
