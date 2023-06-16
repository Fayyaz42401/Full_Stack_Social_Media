import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import { CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { theme } from "./theme.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute } from "protected-route-react";
import { allUser, getUser } from "./store/actions/userAction";
import { allPost } from "./store/actions/postAction";
import ForgotPassword from "./components/auth/ForgotPassword";
const App = () => {
  const { user, isAuthenticated, allUsers, themeMode } = useSelector(
    (state) => state.user
  );
  const { posts, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(allUser());
    dispatch(allPost());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline />
      <Paper
        elevation={0}
        variant="elevation"
        sx={{ borderRadius: "0px", minHeight: "100vh" }}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Home user={user} posts={posts} allUsers={allUsers} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated}>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  redirect={"/"}
                  isAuthenticated={!isAuthenticated}
                >
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route
              path="forgotpassword"
              element={
                <ProtectedRoute
                  redirect={"/"}
                  isAuthenticated={!isAuthenticated}
                >
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer
            theme={themeMode === "dark" ? "dark" : "light"}
            autoClose={2000}
          />
        </Router>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
