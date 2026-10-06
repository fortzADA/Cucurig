import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import {
  arrangements,
  floristById,
  occasions,
  type Occasion,
} from "../data";

type Sort = "featured" | "price-asc" | "price-desc";

function isOccasion(value: string | null): value is Occasion {
  return !!value && (occasions as readonly string[]).includes(value);
}

export function Shop() {
  const [params, setParams] = useSearchParams();
  const occasion = isOccasion(params.get("occasion")) ? params.get("occasion") : "";
  const query = params.get("q") ?? "";
  const sameDay = params.get("sameDay") === "1";
  const sort = (params.get("sort") as Sort) || "featured";

  useEffect(() => {
    document.title = "Market — Cucurig";
  }, []);

  function update(next: Record<string, string | null>) {
    const merged = new URLSearchParams(params);
    for (const [key, value] of Object.entries(next)) {
      if (!value) merged.delete(key);
      else merged.set(key, value);
    }
    setParams(merged);
  }

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = arrangements.filter((arrangement) => {
      const florist = floristById(arrangement.floristId);
      if (!florist) return false;
      if (occasion && !arrangement.occasions.includes(occasion as Occasion)) return false;
      if (sameDay && !arrangement.sameDay) return false;
      if (!needle) return true;
      const haystack = `${arrangement.name} ${arrangement.stems} ${florist.name} ${florist.city}`.toLowerCase();
      return haystack.includes(needle);
    });
    const ranked = [...filtered];
    ranked.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return Number(!!b.featured) - Number(!!a.featured) || a.name.localeCompare(b.name);
    });
    return ranked;
  }, [occasion, query, sameDay, sort]);

  const signatures = arrangements.filter(
    (arrangement) => arrangement.signature && visible.some((item) => item.id === arrangement.id),
  );
  const bench = visible.filter((arrangement) => !arrangement.signature);

  return (
    <div className="section page">
      <p className="kicker">02 · The market</p>
      <h1 className="page-title">The bench</h1>
      <p className="page-intro">
        Everything Cucurig has arranged for Los Angeles. Same-morning pieces leave today if you order before 2:00 p.m. Pacific.
        The others are composed a day ahead.
      </p>
      <div className="shop-layout">
        <form className="filters" onSubmit={(event) => event.preventDefault()}>
          <div className="filter-tools">
            <label>
              Search
              <input
                value={query}
                placeholder="Roses, tulips, a color"
                onChange={(event) => update({ q: event.target.value || null })}
              />
            </label>
            <label>
              Sort
              <select value={sort} onChange={(event) => update({ sort: event.target.value })}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={sameDay}
                onChange={(event) => update({ sameDay: event.target.checked ? "1" : null })}
              />
              Same morning only
            </label>
          </div>
          <div className="chip-list" role="group" aria-label="Occasion">
            <button
              type="button"
              className="chip"
              aria-pressed={!occasion}
              onClick={() => update({ occasion: null })}
            >
              All occasions
            </button>
            {occasions.map((item) => (
              <button
                key={item}
                type="button"
                className="chip"
                aria-pressed={occasion === item}
                onClick={() => update({ occasion: occasion === item ? null : item })}
              >
                {item}
              </button>
            ))}
          </div>
        </form>
        <div>
          {visible.length === 0 ? (
            <p className="empty">
              Nothing on the bench for this filter. Try another occasion.
            </p>
          ) : (
            <>
              {signatures.length > 0 ? (
                <section className="signature-block">
                  <div className="section-head">
                    <h2>
                      <span>Signature</span>From the mark
                    </h2>
                  </div>
                  <div className="signature-grid">
                    {signatures.map((arrangement, index) => (
                      <ProductCard
                        key={arrangement.id}
                        arrangement={arrangement}
                        index={index}
                        variant="specimen"
                      />
                    ))}
                  </div>
                </section>
              ) : null}
              {bench.length > 0 ? (
                <div className="ledger-list">
                  {bench.map((arrangement) => (
                    <ProductCard key={arrangement.id} arrangement={arrangement} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
