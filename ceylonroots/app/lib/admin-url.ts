const DEFAULT_ADMIN_HOST = "admin.localhost";
const DEFAULT_DEV_PORT = "3000";

const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const getAdminDashboardUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (typeof window === "undefined") {
    return `http://${DEFAULT_ADMIN_HOST}:${DEFAULT_DEV_PORT}`;
  }

  const { protocol, port } = window.location;
  const resolvedPort = port || DEFAULT_DEV_PORT;

  return `${protocol}//${DEFAULT_ADMIN_HOST}:${resolvedPort}`;
};
