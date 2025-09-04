import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

import { Toaster } from "react-hot-toast";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={authUser?.isOnboarded ? "/" : "/onboarding"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={authUser?.isOnboarded ? "/" : "/onboarding"} />}
        />

        {/* Onboarding route */}
        <Route
          path="/onboarding"
          element={authUser ? !authUser.isOnboarded ? <OnboardingPage /> : <Navigate to="/" /> : <Navigate to="/login" />}
        />

        {/* Call page does not use the layout */}
        <Route
          path="/call/:id"
          element={authUser && authUser.isOnboarded ? <CallPage /> : <Navigate to="/login" />}
        />

        {/* This is the parent route for all protected pages that use the Layout */}
        <Route
          element={
            authUser && authUser.isOnboarded ? <Layout /> : <Navigate to="/login" />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;