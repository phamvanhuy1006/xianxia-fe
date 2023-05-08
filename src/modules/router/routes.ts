import { lazy } from "react";
import AuthGuard from "src/components/AuthGuard";
import GuestGuard from "src/components/GuestGuard";
import Login from "src/pages/Login";
import SCREEN_PATHS from "src/shared/constants/screenPaths";
import { IRoutesState } from "./route.model";

const routes: IRoutesState[] = [
  {
    guard: GuestGuard,
    path: SCREEN_PATHS.LOGIN,
    layout: Login,
    component: lazy(() => import("src/pages/Login")),
  },
//   {
//     guard: AuthGuard,
//     path: SCREEN_PATHS.ALL,
//     layout: generalLayout,
//     routes: [],
//   },
];

export default routes;
