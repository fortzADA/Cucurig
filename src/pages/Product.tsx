import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import {
  arrangementById,
  arrangementsForFlorist,
  floristById,
  formatPrice,
  sameMorningOpen,
} from "../data";
import { useMarket } from "../market";

export function Product() {
  const { id } = useParams();
  const arrangement = id ? arrangementById(id) : undefined;
  const florist = arrangement ? floristById(arrangement.floristId) : undefined;
  const { add } = useMarket();
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    document.title = arrangement ? `${arrangement.name} — Cucurig` : "Arrangement — Cucurig";
    setQuantity(1);
    setNotice("");
  }, [arrangement]);

  if (!arrangement || !florist) {
    return (
      <div className="section page">
        <h1 className="page-title">This arrangement has left the bench.</h1>
        <p className="page-intro">It may have been retired for the season.</p>
        <Link className="btn" to="/shop">
          Back to the market
        </Link>
      </div>
    );
  }

  const others = arrangementsForFlorist(florist.id).filter((item) => item.id !== arrangement.id);
  const open = sameMorningOpen();

  return (
    <div className="section page">
      <div className="detail">
        <div className="detail-photo alive">
          <img src={arrangement.image} alt={arrangement.name} />
        </div>
        <div>
          <p className="kicker">
            <Link to={`/florists/${florist.id}`}>{florist.name}</Link> · {florist.city}
          </p>
          <h1>{arrangement.name}</h1>
          <p className="detail-price">{formatPrice(arrangement.price)}</p>
          <p className="lede" style={{ marginTop: 0 }}>
            {arrangement.description}
          </p>
          <dl className="facts">
            <div>
              <dt>Stems</dt>
              <dd>{arrangement.stems}</dd>
            </div>
            <div>
              <dt>In the vase</dt>
              <dd>{arrangement.vaseLife}</dd>
            </div>
            <div>
              <dt>Occasions</dt>
              <dd>{arrangement.occasions.join(", ")}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>
                {arrangement.sameDay
                  ? open
                    ? `Same morning in ${florist.city}, if you order before 2:00 p.m. Pacific`
                    : `From tomorrow in ${florist.city}`
                  : `Composed a day ahead, delivered in ${florist.city}`}
              </dd>
            </div>
          </dl>
          <div className="qty-row">
            <div className="stepper" aria-label="Quantity">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => Math.min(20, value + 1))} aria-label="Increase quantity">
                +
              </button>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                add(arrangement.id, quantity);
                setNotice("Added to your cart.");
              }}
            >
              Add to cart
            </button>
          </div>
          {notice ? (
            <p className="notice" role="status">
              {notice} <Link to="/cart">View cart</Link>
            </p>
          ) : (
            <p className="notice">You pay the driver when the flowers arrive.</p>
          )}
        </div>
      </div>
      {others.length > 0 ? (
        <section style={{ marginTop: "3rem" }}>
          <div className="section-head">
            <h2>Also on the bench</h2>
          </div>
          <div className="ledger-list">
            {others.map((item) => (
              <ProductCard key={item.id} arrangement={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
