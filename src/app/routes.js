import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("app/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("app/views/sessions/ForgotPassword")));

// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

const VerifyOtp = Loadable(lazy(() => import("app/views/verify-otp/index")));

const ResetPassword = Loadable(lazy(() => import("app/views/resetPassword/index")));

const ChangePassword = Loadable(lazy(() => import("app/views/change-password/index")));
const AdminBrand = Loadable(lazy(() => import("app/views/brand/index")));
const AdminCreateBrand = Loadable(lazy(() => import("app/views/brand/create")));
const AdminEditBrand = Loadable(lazy(() => import("app/views/brand/edit")));

const AdminSections = Loadable(lazy(() => import("app/views/sections/index")));
const AdminCreateSections = Loadable(lazy(() => import("app/views/sections/create")));
const AdminEditSections = Loadable(lazy(() => import("app/views/sections/edit")));

const AdminCategory = Loadable(lazy(() => import("app/views/category/index")));
const AdminCreateCategory = Loadable(lazy(() => import("app/views/category/create")));
const AdminEditCategory = Loadable(lazy(() => import("app/views/category/edit")));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard", element: <Analytics />, auth: authRoles.admin },
      { path: "/change-password", element: <ChangePassword />, auth: authRoles.admin },
      { path: "/brand-listing", element: <AdminBrand />, auth: authRoles.admin },
      { path: "/brand-create", element: <AdminCreateBrand />, auth: authRoles.admin },
      { path: "/brand-edit/:id", element: <AdminEditBrand />, auth: authRoles.admin },

      { path: "/sections-listing", element: <AdminSections />, auth: authRoles.admin },
      { path: "/sections-create", element: <AdminCreateSections />, auth: authRoles.admin },
      { path: "/sections-edit/:id", element: <AdminEditSections />, auth: authRoles.admin },

      { path: "/Category-listing", element: <AdminCategory />, auth: authRoles.admin },
      { path: "/Category-create", element: <AdminCreateCategory />, auth: authRoles.admin },
      { path: "/Category-edit/:id", element: <AdminEditCategory />, auth: authRoles.admin },

      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor }
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/login", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/dashboard", element: <Navigate to="dashboard" /> },
  { path: "/", element: <Navigate to="login" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
