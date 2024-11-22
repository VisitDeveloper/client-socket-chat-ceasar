import { APP_ROUTES } from "./app-routes";

export const isRouteNeedAuth = (path) => {
    // if (path.startsWith("/admin")) return false;
    switch (path) {
      case APP_ROUTES.LOGIN:
        return false;
      default:
        return true;
    }
  };