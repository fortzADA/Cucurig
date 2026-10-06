import { Link } from "react-router-dom";
import { floristById, formatPrice, type Arrangement } from "../data";

export function ProductCard({
  arrangement,
  index,
  variant = "ledger",
}: {
  arrangement: Arrangement;
  index?: number;
  variant?: "ledger" | "specimen";
}) {
  const florist = floristById(arrangement.floristId);
  if (!florist) return null;

  if (variant === "specimen") {
    const label = String((index ?? 0) + 1).padStart(2, "0");
    return (
      <article className="specimen">
        <Link className="alive" to={`/shop/${arrangement.id}`}>
          <img src={arrangement.image} alt="" />
          <span className="specimen-index">{label}</span>
          <span className="specimen-meta">
            <span className="eyebrow">{arrangement.occasions.join(" · ")}</span>
            <strong>{arrangement.name}</strong>
            <span>
              {formatPrice(arrangement.price)} · {arrangement.sameDay ? "Same morning" : "Next day"}
            </span>
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article>
      <Link className="ledger" to={`/shop/${arrangement.id}`}>
        <img src={arrangement.image} alt="" />
        <span className="ledger-copy">
          <span className="eyebrow">{arrangement.occasions.join(" · ")}</span>
          <strong>{arrangement.name}</strong>
          <span className="quiet">{arrangement.stems}</span>
        </span>
        <span className="ledger-price">
          <strong>{formatPrice(arrangement.price)}</strong>
          {arrangement.sameDay ? <span>Same morning</span> : <span>Next day</span>}
        </span>
      </Link>
    </article>
  );
}
