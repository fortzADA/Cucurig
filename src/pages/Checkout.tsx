import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  arrangementById,
  dateISO,
  deliveryFeeFor,
  floristById,
  formatPrice,
  sameMorningOpen,
  type City,
} from "../data";
import { useMarket, type CustomerDetails } from "../market";

const empty: CustomerDetails = {
  name: "",
  phone: "",
  address: "",
  date: "",
  cardMessage: "",
  note: "",
};

export function Checkout() {
  const { lines, placeOrder } = useMarket();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDetails>(empty);
  const [error, setError] = useState("");
  const ordered = useRef(false);

  useEffect(() => {
    document.title = "Checkout — Cucurig";
  }, []);

  const detailed = useMemo(
    () =>
      lines.flatMap((line) => {
        const arrangement = arrangementById(line.arrangementId);
        const florist = arrangement ? floristById(arrangement.floristId) : undefined;
        if (!arrangement || !florist) return [];
        return [{ ...line, arrangement, florist }];
      }),
    [lines],
  );

  const citiesInCart = [...new Set(detailed.map((line) => line.florist.city))] as City[];
  const subtotal = detailed.reduce((sum, line) => sum + line.arrangement.price * line.quantity, 0);
  const fee = deliveryFeeFor(subtotal);
  const leadTime = detailed.some((line) => !line.arrangement.sameDay) || !sameMorningOpen();
  const minDate = dateISO(leadTime ? 1 : 0);

  useEffect(() => {
    setCustomer((current) => (current.date ? current : { ...current, date: minDate }));
  }, [minDate]);

  if (detailed.length === 0) {
    if (ordered.current) return null;
    return <Navigate to="/cart" replace />;
  }
  if (citiesInCart.length !== 1) return <Navigate to="/cart" replace />;

  const city = citiesInCart[0];

  function update<K extends keyof CustomerDetails>(key: K, value: CustomerDetails[K]) {
    setCustomer((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (customer.name.trim().length < 2) {
      setError("Add the name the driver should ask for.");
      return;
    }
    if (customer.phone.trim().length < 8) {
      setError("Add a phone number the shop can call.");
      return;
    }
    if (customer.address.trim().length < 6) {
      setError("Add a street address in " + city + ".");
      return;
    }
    if (!customer.date || customer.date < minDate) {
      setError("Choose a delivery date the bench can still make.");
      return;
    }
    ordered.current = true;
    const order = placeOrder(
      {
        ...customer,
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        cardMessage: customer.cardMessage.trim(),
        note: customer.note.trim(),
      },
      city,
      fee,
    );
    navigate(`/orders/${order.id}`, { state: order });
  }

  return (
    <div className="section page">
      <p className="kicker">Checkout · {city}</p>
      <h1 className="page-title">Where should they go?</h1>
      <div className="checkout-layout">
        <form className="form" onSubmit={submit}>
          {error ? <p className="alert">{error}</p> : null}
          <label>
            Name
            <input value={customer.name} autoComplete="name" onChange={(event) => update("name", event.target.value)} />
          </label>
          <label>
            Phone
            <input
              value={customer.phone}
              autoComplete="tel"
              inputMode="tel"
              placeholder="(213) 555-0142"
              onChange={(event) => update("phone", event.target.value)}
            />
          </label>
          <label>
            Address in {city}
            <input
              value={customer.address}
              autoComplete="street-address"
              onChange={(event) => update("address", event.target.value)}
            />
          </label>
          <label>
            Delivery date
            <input
              type="date"
              value={customer.date}
              min={minDate}
              onChange={(event) => update("date", event.target.value)}
            />
          </label>
          <label>
            Card message
            <textarea
              value={customer.cardMessage}
              maxLength={180}
              placeholder="A line for the person who opens them"
              onChange={(event) => update("cardMessage", event.target.value)}
            />
          </label>
          <label>
            Note for the shop
            <textarea
              value={customer.note}
              maxLength={240}
              placeholder="Gate code, a time window, what to avoid"
              onChange={(event) => update("note", event.target.value)}
            />
          </label>
          <p className="quiet">
            {leadTime
              ? "This order leaves tomorrow or later. Something in the cart is composed a day ahead, or today’s cutoff has passed."
              : "Same-morning delivery is still open. The flowers leave the shop today."}
          </p>
          <button className="btn btn-primary" type="submit">
            Place order · {formatPrice(subtotal + fee)}
          </button>
          <Link to="/cart">Back to cart</Link>
        </form>
        <aside className="summary">
          <h2>On delivery</h2>
          {detailed.map((line) => (
            <div className="summary-row" key={line.arrangementId}>
              <span>
                {line.quantity} × {line.arrangement.name}
                <br />
                <span className="quiet">{line.florist.name}</span>
              </span>
              <span>{formatPrice(line.arrangement.price * line.quantity)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Delivery</span>
            <span>{fee === 0 ? "Free" : formatPrice(fee)}</span>
          </div>
          <div className="summary-row total">
            <span>Pay the driver</span>
            <span>{formatPrice(subtotal + fee)}</span>
          </div>
          <p className="quiet">Card payment is not connected yet. The driver collects this amount.</p>
        </aside>
      </div>
    </div>
  );
}
