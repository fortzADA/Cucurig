import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { arrangementById } from "../data";

const placeKinds = ["Hotel", "Office", "Restaurant", "Dining", "Ballroom"] as const;

type PlaceKind = (typeof placeKinds)[number];

const places: { id: string; kind: PlaceKind; room: string }[] = [
  { id: "first-crow", kind: "Hotel", room: "Lobby" },
  { id: "yellow-crow", kind: "Hotel", room: "Breakfast room" },
  { id: "dutch-iris", kind: "Hotel", room: "Lobby" },
  { id: "late-tulips", kind: "Hotel", room: "Corridor" },
  { id: "the-call", kind: "Hotel", room: "Bedside" },
  { id: "ribbon-sun", kind: "Hotel", room: "Front desk" },
  { id: "before-the-crow", kind: "Hotel", room: "Lobby at night" },
  { id: "dawn-crescent", kind: "Hotel", room: "Restaurant at dawn" },
  { id: "night-bench", kind: "Office", room: "Reception" },
  { id: "the-sill", kind: "Office", room: "Window" },
  { id: "the-perch", kind: "Office", room: "Meeting room" },
  { id: "freesia", kind: "Office", room: "Desk" },
  { id: "cockscomb", kind: "Restaurant", room: "Table for two" },
  { id: "the-eye", kind: "Restaurant", room: "Bistro table" },
  { id: "apple-branch", kind: "Restaurant", room: "Window table" },
  { id: "the-sun", kind: "Restaurant", room: "Table for two" },
  { id: "olive-morning", kind: "Restaurant", room: "Window table" },
  { id: "night-dahlia", kind: "Restaurant", room: "Table" },
  { id: "five", kind: "Dining", room: "Private dining room" },
  { id: "wheat", kind: "Dining", room: "Long table" },
  { id: "one-peony", kind: "Dining", room: "Fine dining" },
  { id: "white-poppy", kind: "Dining", room: "Table by the window" },
  { id: "the-tail", kind: "Ballroom", room: "Banquet table" },
  { id: "gold-hour", kind: "Ballroom", room: "Banquet table" },
];

export function Gallery() {
  const [kind, setKind] = useState<PlaceKind | "">("");

  useEffect(() => {
    document.title = "Gallery — Cucurig";
  }, []);

  const visible = useMemo(
    () => (kind ? places.filter((place) => place.kind === kind) : places),
    [kind],
  );

  const groups = placeKinds
    .map((placeKind) => ({
      kind: placeKind,
      items: visible.filter((place) => place.kind === placeKind),
    }))
    .filter((group) => group.items.length > 0);

  let index = 0;

  return (
    <div className="section page">
      <p className="kicker">03 · Places</p>
      <h1 className="page-title">Gallery</h1>
      <p className="page-intro">
        The same bunches, off the bench: hotel lobbies, offices, restaurants, dining tables, and ballrooms.
      </p>
      <div className="chip-list gallery-filters" role="group" aria-label="Place">
        <button type="button" className="chip" aria-pressed={!kind} onClick={() => setKind("")}>
          All places
        </button>
        {placeKinds.map((placeKind) => (
          <button
            key={placeKind}
            type="button"
            className="chip"
            aria-pressed={kind === placeKind}
            onClick={() => setKind(kind === placeKind ? "" : placeKind)}
          >
            {placeKind}
          </button>
        ))}
      </div>
      {groups.map((group) => (
        <section key={group.kind} className="signature-block">
          <div className="section-head">
            <h2>
              <span>{String(group.items.length).padStart(2, "0")}</span>
              {group.kind}
            </h2>
          </div>
          <div className="place-grid">
            {group.items.map((place) => {
              const arrangement = arrangementById(place.id);
              const name = arrangement?.name ?? place.id;
              index += 1;
              return (
                <article key={place.id} className="place-card">
                  <Link to={`/shop/${place.id}`}>
                    <img src={`/places/${place.id}.jpg`} alt={`${name} in a ${place.room.toLowerCase()}`} />
                    <span className="specimen-index">{String(index).padStart(2, "0")}</span>
                    <span className="specimen-meta">
                      <span className="eyebrow">{place.room}</span>
                      <strong>{name}</strong>
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
