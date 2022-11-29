import { Route, Routes } from "react-router"
import {
  CreateEggPage,
  InventoryPage,
  MenuPage,
  MainPage,
  RankingPage,
  RepoEditPage,
  SettingPage,
  ShopPage,
  StatusPage,
  NoticePage,
  GravesPage,
} from "../pages"

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/createEgg" element={<CreateEggPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/repoEdit" element={<RepoEditPage />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/graves" element={<GravesPage />} />
    </Routes>
  )
}

export default Router
