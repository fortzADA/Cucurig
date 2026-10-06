import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { formatLongDate, formatPrice } from "../data";
import { useMarket, type Order } from "../market";

export function Confirmation() {
  const { id } = useParams();
  const location = useLocation();
  const { orderById } = useMarket();
  const fromNavigation = location.state as Order | null;
  const order = (id ? orderById(id) : undefined) ?? (fromNavigation?.id === id ? fromNavigation : undefined);

  useEffect(() => {
    document.title = order ? `Order ${order.id} — Cucurig` : "Order — Cucurig";
  }, [order]);

  if (!order) {
    return (
      <div className="section page">
        <h1 className="page-title">That order is not on this device.</h1>
        <p className="page-intro">Orders are kept in the browser until a shop desk is connected.</p>
        <Link className="btn" to="/shop">
          Back to the market
        </Link>
      </div>
    );
  }

  return (
    <div className="section page">
      <p className="kicker">Order {order.id}</p>
      <h1 className="page-title">The shop has it.</h1>
      <p className="page-intro">
        Delivery in {order.city} on {formatLongDate(order.customer.date)}, to {order.customer.name} at{" "}
        {order.customer.address}. Have {formatPrice(order.total)} ready for the driver.
      </p>
      <ul className="confirm-list">
        {order.lines.map((line) => (
          <li key={line.arrangementId}>
            <span>
              {line.quantity} × {line.name}
              <br />
              <span className="quiet">{line.floristName}</span>
            </span>
            <span>{formatPrice(line.price * line.quantity)}</span>
          </li>
        ))}
        <li>
          <span>Delivery</span>
          <span>{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</span>
        </li>
      </ul>
      {order.customer.cardMessage ? (
        <p className="notice">Card: “{order.customer.cardMessage}”</p>
      ) : null}
      <div className="actions">
        <Link className="btn btn-primary" to="/shop">
          Keep browsing
        </Link>
      </div>
    </div>
  );
}
