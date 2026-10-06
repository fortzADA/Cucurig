import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  arrangementById,
  deliveryFeeFor,
  floristById,
  formatPrice,
  FREE_DELIVERY_FROM,
  type City,
} from "../data";
import { useMarket } from "../market";

export function Cart() {
  const { lines, setQuantity, remove } = useMarket();

  useEffect(() => {
    document.title = "Cart — Cucurig";
  }, []);

  const detailed = lines.flatMap((line) => {
    const arrangement = arrangementById(line.arrangementId);
    const florist = arrangement ? floristById(arrangement.floristId) : undefined;
    if (!arrangement || !florist) return [];
    return [{ ...line, arrangement, florist }];
  });

  const citiesInCart = [...new Set(detailed.map((line) => line.florist.city))] as City[];
  const subtotal = detailed.reduce((sum, line) => sum + line.arrangement.price * line.quantity, 0);
  const oneCity = citiesInCart.length === 1;
  const fee = oneCity ? deliveryFeeFor(subtotal) : 0;

  if (detailed.length === 0) {
    return (
      <div className="section page">
        <h1 className="page-title">Your cart is empty.</h1>
        <p className="page-intro">The bench is still open.</p>
        <Link className="btn btn-primary" to="/shop">
          Shop the market
        </Link>
      </div>
    );
  }

  return (
    <div className="section page">
      <h1 className="page-title">Cart</h1>
      <div className="cart-layout">
        <div>
          {detailed.map((line) => (
            <article className="line" key={line.arrangementId}>
              <img src={line.arrangement.image} alt="" />
              <div>
                <p className="eyebrow">{line.arrangement.occasions.join(" · ")}</p>
                <h3>
                  <Link to={`/shop/${line.arrangement.id}`}>{line.arrangement.name}</Link>
                </h3>
                <div className="qty-row">
                  <div className="stepper">
                    <button
                      type="button"
                      aria-label={`Decrease ${line.arrangement.name}`}
                      onClick={() => setQuantity(line.arrangementId, line.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{line.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${line.arrangement.name}`}
                      onClick={() => setQuantity(line.arrangementId, line.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button className="linkish" type="button" onClick={() => remove(line.arrangementId)}>
                    Remove
                  </button>
                </div>
              </div>
              <p className="price">{formatPrice(line.arrangement.price * line.quantity)}</p>
            </article>
          ))}
        </div>
        <aside className="summary">
          <h2>Delivery</h2>
          <div className="summary-row">
            <span>Arrangements</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{oneCity ? (fee === 0 ? "Free" : formatPrice(fee)) : "—"}</span>
          </div>
          <div className="summary-row total">
            <span>To pay on delivery</span>
            <span>{oneCity ? formatPrice(subtotal + fee) : formatPrice(subtotal)}</span>
          </div>
          <p className="quiet">
            {oneCity
              ? `Delivered in ${citiesInCart[0]}, California. Delivery is free from ${formatPrice(FREE_DELIVERY_FROM)}.`
              : "Choose one city to see the delivery fee."}
          </p>
          {oneCity ? (
            <Link className="btn btn-primary" to="/checkout">
              Checkout
            </Link>
          ) : (
            <button className="btn btn-primary" type="button" disabled>
              Checkout
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}
