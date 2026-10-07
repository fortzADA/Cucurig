import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MarketProvider } from "./market";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Confirmation } from "./pages/Confirmation";
import { Florist } from "./pages/Florist";
import { Gallery } from "./pages/Gallery";
import { Florists } from "./pages/Florists";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Sell } from "./pages/Sell";
import { Shop } from "./pages/Shop";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  useEffect(() => {
    document.title = "Not found — Cucurig";
  }, []);
  return (
    <div className="section page">
      <h1 className="page-title">This page is not in the market.</h1>
      <p className="page-intro">The bench you want is probably one click back.</p>
      <Link className="btn btn-primary" to="/">
        Go to Cucurig
      </Link>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <MarketProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="shop/:id" element={<Product />} />
            <Route path="florists" element={<Florists />} />
            <Route path="florists/:id" element={<Florist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders/:id" element={<Confirmation />} />
            <Route path="sell" element={<Sell />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MarketProvider>
    </BrowserRouter>
  );
}
