import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LandingPage from "../pages/LandingPage";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import HomePage from "../pages/HomePage";
import SettingsPage from "../pages/SettingsPage";
import TimerPage from "../pages/TimerPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "register", element: <SignUpForm /> },
      { path: "login", element: <LoginForm /> },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "focus", element: <TimerPage /> },
        ],
      },
    ],
  },
]);

export default router;
