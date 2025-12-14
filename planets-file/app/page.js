import { sql } from "@vercel/postgres";
import Link from "next/link";
import ApodSection from "./components/ApodiSection";
import NasaMediaSection from "./components/NasaMediaSection";

export default async function HomePage() {
  const { rows: planets } = await sql`
    SELECT * FROM planets ORDER BY id ASC
  `;

  {/*body inicial*/}
  return (
    <div className="page-container">
      <main className="planet">
        <section className="planet-text">
          <h2>Conheça os planetas</h2>
          <h1 className="highlight">INCOMUNS</h1>
          <p>Viaje pelos mundos mais estranhos da nossa galáxia.</p>
          <p>De planetas feitos de diamante a gigantes gasosos</p>
          <p>que produzem chuva de vidro, entre muito mais.</p>

          <div className="buttons">
            <button className="primary">Comece a explorar</button>
            <button className="secondary">Outros</button>
          </div>

          <section className="hero-image">
            <img src="/p.png" alt="Strange Planet" />
          </section>
        </section>
      </main>

      {/*primeira seção*/}
      <section className="divisor" />
      <div style={{ display: "flex", gap: "10px", color: "#ff39b6" }}>
        <h2><span className="text1">PRINCIPAIS</span></h2>
        <h2><span className="text2">PLANETAS</span></h2>
      </div>
      <div className="text-section">
        <p>Visualize os planetas mais procurados!</p>
      </div>

      <section className="cards-container">
        {planets.map((planet) => (
          <div key={planet.id} className="planet-card">
            <div className="image-box">
              <img src={planet.image_url} alt={planet.name} />
            </div>
            <div className="tag">{planet.type}</div>
            <h3 className="title">{planet.name}</h3>
            <p className="desc">
              {planet.description.substring(0, 160)}...
            </p>
            <div className="details-row">
              <span className="light">
                {planet.light_years} anos-luz
              </span>

              {/* botão para abrir detalhes (não funciona)*/}
              <Link href={`/planet/${planet.id}`} className="details-btn">
                Detalhes →
              </Link>
            </div>
          </div>
        ))}
      </section>
      <section className="divisor" />
      <ApodSection />
      <NasaMediaSection />
    </div>
  );
}
