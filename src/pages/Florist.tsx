import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { arrangementsForFlorist, floristById } from "../data";
import { useMarket } from "../market";

export function Florist() {
  const { id } = useParams();
  const florist = id ? floristById(id) : undefined;
  const { setCity } = useMarket();
  const bench = florist ? arrangementsForFlorist(florist.id) : [];

  useEffect(() => {
    document.title = florist ? `${florist.name} — Cucurig` : "Florist — Cucurig";
    if (florist) setCity(florist.city);
  }, [florist, setCity]);

  if (!florist) {
    return (
      <div className="section page">
        <h1 className="page-title">That shop is not on the market.</h1>
        <Link className="btn" to="/shop">
          Back to the bench
        </Link>
      </div>
    );
  }

  return (
    <div className="section page">
      <div className="detail">
        <div className="detail-photo alive">
          <img src={florist.cover} alt={`${florist.name} in ${florist.city}`} />
        </div>
        <div>
          <p className="kicker">
            {florist.city} · {florist.neighborhood} · since {florist.since}
          </p>
          <h1>{florist.name}</h1>
          <p className="lede" style={{ marginTop: 0 }}>
            {florist.bio}
          </p>
          <p className="notice">{florist.specialty}</p>
        </div>
      </div>
      <section style={{ marginTop: "2.5rem" }}>
        <div className="section-head">
          <h2>On the bench</h2>
          <Link to="/shop">The whole bench</Link>
        </div>
        <div className="ledger-list">
          {bench.map((arrangement) => (
            <ProductCard key={arrangement.id} arrangement={arrangement} />
          ))}
        </div>
      </section>
    </div>
  );
}
