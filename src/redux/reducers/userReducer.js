import { createReducer } from "@reduxjs/toolkit";

const initialAuthState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  message: null,
  error: null,
};

export const authReducer = createReducer(initialAuthState, {
  loadUserRequest: (state) => {
    state.loading = true;
  },
  loadUserSucess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  loadUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  signupRequest: (state) => {
    state.loading = true;
  },
  signupRequestSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  signupRequestFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  loginRequest: (state) => {
    state.loading = true;
  },
  loginRequestSucess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.message = action.payload;
  },
  loginRequestFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  logoutRequest: (state) => {
    state.loading = true;
  },
  logoutSucess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.message = action.payload;
    state.user = null;
  },
  logoutFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const contactReducer = createReducer(
  {},
  {
    contactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    contactFailed: (state, action) => {
      state.error = action.payload;
    },
  }
);
