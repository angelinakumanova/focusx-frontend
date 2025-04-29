import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "register", element: <SignUpForm /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
]);

export default router;
