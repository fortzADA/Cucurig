import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { sameMorningOpen } from "../data";
import { useMarket } from "../market";

export function Layout() {
  const { count } = useMarket();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const openNow = sameMorningOpen();

  return (
    <div className="shell">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <aside className="spine">
        <Link className="spine-brand" to="/" aria-label="Cucurig, home">
          <img src="/logo-mark.png" alt="" />
          <span className="wordmark">Cucurig</span>
        </Link>
        <nav className="spine-nav" aria-label="Primary">
          <NavLink to="/shop">
            <span>01</span>Market
          </NavLink>
          <NavLink to="/florists/cucurig">
            <span>02</span>The shop
          </NavLink>
        </nav>
        <div className="spine-foot">
          <p className="quiet">Los Angeles</p>
          <p className="quiet">
            {openNow ? "Same-morning orders are open until 2:00 p.m. Pacific." : "Today’s bench is closed."}
          </p>
          <Link className="cart-link" to="/cart">
            Cart
            {count > 0 ? <span className="count">{count}</span> : null}
          </Link>
        </div>
      </aside>
      <div className="canvas">
        <p className="status-rail">
          <span>34.09° N</span>
          <span>118.27° W</span>
          <span>Silver Lake</span>
          <span className={openNow ? "is-live" : "is-idle"}>
            {openNow ? "Bench open" : "Bench closed"}
          </span>
          <span>Cutoff 14:00 PT</span>
        </p>
        <header className="topbar">
          <div className="header-inner">
            <Link className="brand" to="/" aria-label="Cucurig, home">
              <img src="/logo-mark.png" alt="" />
              <span className="brand-name wordmark">Cucurig</span>
            </Link>
            <Link className="cart-link" to="/cart">
              Cart
              {count > 0 ? <span className="count">{count}</span> : null}
            </Link>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              Menu
            </button>
          </div>
          <nav id="mobile-nav" className="nav-panel" hidden={!open} aria-label="Mobile">
            <NavLink to="/shop" onClick={() => setOpen(false)}>
              <span>01</span>Market
            </NavLink>
            <NavLink to="/florists/cucurig" onClick={() => setOpen(false)}>
              <span>02</span>The shop
            </NavLink>
            <p className="quiet">Los Angeles</p>
            <p className="quiet">
              {openNow ? "Same-morning orders are open until 2:00 p.m. Pacific." : "Today’s bench is closed."}
            </p>
          </nav>
        </header>
        <main id="main" key={location.pathname}>
          <Outlet />
        </main>
        <footer className="site-footer">
          <div className="footer-inner">
            <p>One shop in Los Angeles. Flowers leave the bench the morning you need them.</p>
            <div className="footer-links">
              <Link to="/shop">Market</Link>
              <Link to="/florists/cucurig">The shop</Link>
            </div>
          </div>
          <p className="credit">
            Same-morning cutoff is 2:00 p.m. Pacific. Flower photographs from Unsplash.
          </p>
        </footer>
      </div>
    </div>
  );
}
