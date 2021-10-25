// import from .env

const { REACT_APP_BACKEND_API_ROUTE } = process.env;

// PUBLIC PAGES

export const PUBLIC = {
  HOME: "/",
};

// API

export const API = {
  MAIN: REACT_APP_BACKEND_API_ROUTE,
  AUTH: "/auth",
};
