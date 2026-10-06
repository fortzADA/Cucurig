import { Link } from "react-router-dom";
import type { Florist } from "../data";

export function FloristTile({ florist }: { florist: Florist }) {
  return (
    <Link className="florist-tile" to={`/florists/${florist.id}`}>
      <img src={florist.cover} alt={`${florist.name} in ${florist.city}`} />
      <span>
        <small>
          {florist.city} · {florist.neighborhood}
        </small>
        <strong>{florist.name}</strong>
      </span>
    </Link>
  );
}
