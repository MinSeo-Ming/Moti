/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test"
    PUBLIC_URL: string
    REACT_APP_CLIENT_ID: string
    REACT_APP_GIT_TOKEN: string
    REACT_APP_VERSION: string
    REACT_APP_NAME: string
  }
}
