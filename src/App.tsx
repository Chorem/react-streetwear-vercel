import "./scss/app.scss";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const ItemInfo = React.lazy(() => import(/* webpackChunkName: "ItemInfo" */ './pages/ItemInfo'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
  <Suspense fallback={<div className="loading">Loading...</div>}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="items/:id" element={<ItemInfo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
  );
}

export default App;
