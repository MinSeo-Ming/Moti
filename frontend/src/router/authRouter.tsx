import { Route, Routes } from "react-router"
import { LoginPage } from "../pages"

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  )
}

export default AuthRouter
