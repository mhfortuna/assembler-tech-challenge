// import from .env

const { REACT_APP_BACKEND_API_ROUTE } = process.env;

// PUBLIC PAGES

export const PUBLIC = {
  HOME: "/",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  CONTENT: "/content",
  CATEGORY: "/category",
};

// API

export const API = {
  MAIN: REACT_APP_BACKEND_API_ROUTE,
  AUTH: "/auth",
  REGISTER: "/register",
  LOGIN: "/login",
  GIF: "/gif",
  GIPHY: "/giphy",
};
