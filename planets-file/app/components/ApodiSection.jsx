"use client";

import { useState } from "react";

export default function ApodSection() {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchApod() {
    if (!date) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Erro ao buscar imagem");
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError("Não foi possível carregar a imagem deste dia.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="apod-section">
      <h2>FOTO DO ESPAÇO DO SEU ANIVERSÁRIO: </h2>
      <p>Saiba qual foto a NASA tirou do espaço no dia do seu aniversário! </p>

      <div className="apod-form">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={fetchApod}>Buscar</button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="apod-content">
          <h3>{data.title}</h3>

          {data.media_type === "image" ? (
            <img src={data.url} alt={data.title} />
          ) : (
            <iframe
              src={data.url}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
            />
          )}

          <p>{data.explanation}</p>
        </div>
      )}
    </section>
  );
}
