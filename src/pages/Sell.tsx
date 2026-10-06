import { useEffect, useState, type FormEvent } from "react";
import { cities, type City } from "../data";

type Application = {
  shop: string;
  city: City;
  name: string;
  phone: string;
  note: string;
};

const STORAGE_KEY = "cucurig-florist-applications";

export function Sell() {
  const [form, setForm] = useState<Application>({
    shop: "",
    city: "Los Angeles",
    name: "",
    phone: "",
    note: "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "For florists — Cucurig";
  }, []);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (form.shop.trim().length < 2 || form.name.trim().length < 2 || form.phone.trim().length < 8) {
      setError("Add the shop name, your name, and a phone number.");
      return;
    }
    const next: Application = {
      shop: form.shop.trim(),
      city: form.city,
      name: form.name.trim(),
      phone: form.phone.trim(),
      note: form.note.trim(),
    };
    let existing: Application[] = [];
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown;
      if (Array.isArray(parsed)) existing = parsed as Application[];
    } catch {
      existing = [];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([next, ...existing]));
    setSaved(true);
  }

  return (
    <div className="section page">
      <p className="kicker">For florists</p>
      <h1 className="page-title">Bring your bench to the market.</h1>
      <p className="page-intro">
        Cucurig is a stall for shops that arrange what they sell. Customers in your city see your
        flowers, order from your bench, and pay the driver on delivery.
      </p>
      <div className="steps">
        <article>
          <span>You arrange</span>
          <h3>Your flowers</h3>
          <p>List what is actually on the bench. Retire a bunch when the stems run out.</p>
        </article>
        <article>
          <span>You deliver</span>
          <h3>Your city</h3>
          <p>Orders stay in the California city you work. Same-morning cutoff is 2:00 p.m. Pacific.</p>
        </article>
        <article>
          <span>You keep</span>
          <h3>The arrangement price</h3>
          <p>The delivery fee is separate. A platform commission is the piece still to set.</p>
        </article>
      </div>
      <div className="sell-form">
        {saved ? (
          <div className="summary">
            <h2>Saved on this device</h2>
            <p>
              {form.shop} in {form.city} is noted. This form does not email anyone yet — connect it to
              an inbox when the florist desk is ready.
            </p>
          </div>
        ) : (
          <form className="form summary" onSubmit={submit}>
            <h2>Tell us about the shop</h2>
            {error ? <p className="alert">{error}</p> : null}
            <label>
              Shop name
              <input value={form.shop} onChange={(event) => setForm({ ...form, shop: event.target.value })} />
            </label>
            <label>
              City
              <select
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value as City })}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Your name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label>
              Phone
              <input
                value={form.phone}
                inputMode="tel"
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
            </label>
            <label>
              What you arrange
              <textarea
                value={form.note}
                onChange={(event) => setForm({ ...form, note: event.target.value })}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Save application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
