import React from "react";

import async from "../components/Async";

import {
  Film as FilmIcon,
  Star as StarIcon,
  Bookmark as BookmarkIcon,
} from "react-feather";

import AuthGuard from "../components/AuthGuard";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ConfirmSignUp from "../pages/auth/ConfirmSignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import ConfirmResetPassword from "../pages/auth/ConfirmResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

const Movie = async(() => import("../pages/Movie"));
const MovieDetail = async(() => import("../pages/MovieDetail"));
const WatchList = async(() => import("../pages/WatchList"));
const AdminMovie = async(() => import("../pages/admin/Movie"));
const AdminRating = async(() => import("../pages/admin/Rating"));

const moviesRoutes = {
  id: "Movies",
  path: "/",
  icon: <FilmIcon />,
  children: null,
  containsHome: true,
  component: Movie,
};

const movieActionRoutes = {
  id: "Movies",
  path: "/movies",
  children: [
    {
      path: "/movies/:movieId",
      component: MovieDetail,
    },
  ],
  containsHome: true,
  component: Movie,
};

const watchListRoutes = {
  id: "WatchList",
  path: "/watchlist",
  icon: <BookmarkIcon />,
  children: null,
  containsHome: false,
  component: WatchList,
  guard: AuthGuard,
};

const adminMovieRoutes = {
  id: "Movies",
  path: "/admin/movies",
  header: "Administration",
  icon: <FilmIcon />,
  containsHome: false,
  component: AdminMovie,
  guard: AuthGuard,
};

const adminRatingRoutes = {
  id: "Rating",
  path: "/admin/rating",
  icon: <StarIcon />,
  containsHome: false,
  component: AdminRating,
  guard: AuthGuard,
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/confirm-sign-up/:signUpUsername",
      name: "Confirm Sign Up",
      component: ConfirmSignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/confirm-reset-password/:resetPasswordUsername",
      name: "Confirm password",
      component: ConfirmResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

export const mainLayoutRoutes = [
  moviesRoutes,
  movieActionRoutes,
  adminMovieRoutes,
  adminRatingRoutes,
  watchListRoutes,
];

export const sidebarRoutes = [adminMovieRoutes, adminRatingRoutes];

export const authLayoutRoutes = [authRoutes];
