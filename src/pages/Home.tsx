import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { arrangements, florists, occasions, sameMorningOpen } from "../data";

export function Home() {
  const open = sameMorningOpen();
  const shop = florists[0];
  const onTheBench = arrangements.filter((arrangement) => arrangement.signature).slice(0, 6);

  useEffect(() => {
    document.title = "Cucurig — Los Angeles";
  }, []);

  return (
    <>
      <section className="stage">
        <div className="stage-copy">
          <p className="kicker">01 · One shop · Los Angeles</p>
          <h1>
            <span className="hero-line">This morning at</span>
            <span className="outline">Cucurig</span>
          </h1>
          <p className="lede">
            A single bench in Silver Lake. The flowers are arranged in the shop and leave for
            delivery the same morning.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" to="/shop">
              Shop the bench
            </Link>
            <Link className="btn" to="/florists/cucurig">
              The shop
            </Link>
          </div>
          <p className="hours">
            {open
              ? "Same-morning orders are open until 2:00 p.m. Pacific."
              : "Today’s bench is closed. You can still order for tomorrow."}
          </p>
        </div>
        <figure className="stage-frame alive">
          <img src={shop.cover} alt="The First crow bunch in clear glass, lit by first light" />
          <figcaption className="hero-caption">
            <span>{shop.neighborhood}</span>
            <span>Since {shop.since}</span>
          </figcaption>
        </figure>
      </section>

      <nav className="occasion-rail" aria-label="Shop by occasion">
        {occasions.map((occasion, index) => (
          <Link key={occasion} to={`/shop?occasion=${encodeURIComponent(occasion)}`}>
            <span>0{index + 1}</span>
            {occasion}
          </Link>
        ))}
      </nav>

      <section className="section">
        <div className="section-head">
          <h2>
            <span>03</span>On the bench
          </h2>
          <Link to="/shop">The whole bench</Link>
        </div>
        <div className="specimen-grid">
          {onTheBench.map((arrangement, index) => (
            <ProductCard key={arrangement.id} arrangement={arrangement} index={index} variant="specimen" />
          ))}
        </div>
      </section>

      <section className="section band">
        <div className="section-head">
          <h2>
            <span>04</span>How an order leaves
          </h2>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <h3>Choose a bunch</h3>
            <p>Everything on the bench was arranged in this shop. What you see is what leaves.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Send it in Los Angeles</h3>
            <p>One store, one city. Delivery stays inside Los Angeles.</p>
          </article>
          <article>
            <span>03</span>
            <h3>It goes out by afternoon</h3>
            <p>Order by 2:00 p.m. Pacific for same-morning delivery. You pay the driver when it arrives.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="story">
          <div className="story-mark">
            <img src="/logo-mark.png" alt="A five-petal flower with a rooster at its center" />
            <span className="wordmark">Cucurig</span>
          </div>
          <div>
            <p>
              Cucurig is the rooster’s call at first light — the hour the shop opens and the
              flowers leave the bench.
            </p>
            <Link className="btn" to="/florists/cucurig">
              About the shop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
