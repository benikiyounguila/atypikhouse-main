// client/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/ui/Layout";
import IndexPage from "./pages/IndexPage";
import PlacePage from "./pages/PlacePage";
import NotFoundPage from "./pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
