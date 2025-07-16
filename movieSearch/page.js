"use client"; // Habilita React Client Components no Next.js

import { useState } from "react";

export default function MovieForm() {
    const [titleSearchKey, setTitleSearchKey] = useState("");
    const [yearSearchKey, setYearSearchKey] = useState("");
    const [movies, setMovies] = useState([]);

    async function handleSearch(event) {
        event.preventDefault(); // Impede o recarregamento da página
        
        const res = await fetch(`http://www.omdbapi.com/?apikey=673b4227&s=${titleSearchKey}&y=${yearSearchKey}`);
        const data = await res.json();

        setMovies(data.Search || []); // Atualiza apenas os resultados da pesquisa
    }

    return (
        <div>
            <form onSubmit={handleSearch}> 
                <label htmlFor="idTitleSearchKey">Título</label>
                <input 
                    id="idTitleSearchKey" 
                    name="titleSearchKey"
                    value={titleSearchKey}
                    onChange={(e) => setTitleSearchKey(e.target.value)}
                />

                <label htmlFor="idYearSearchKey">Ano</label>
                <input 
                    id="idYearSearchKey" 
                    name="yearSearchKey"
                    value={yearSearchKey}
                    onChange={(e) => setYearSearchKey(e.target.value)}
                />

                <button type="submit">Pesquisar</button>
            </form>

            {/* Exibição dos resultados */}
            <div>
                {movies.length > 0 ? (
                    movies.map((m) => (
                        <div key={m.imdbID} style={{ marginBottom: "20px" }}>
                            <h2>{m.Title} ({m.Year})</h2>
                            {m.Poster !== "N/A" ? (
                                <img src={m.Poster} alt={`Pôster de ${m.Title}`} style={{ width: "150px", height: "auto" }} />
                            ) : (
                                <p>Pôster não disponível</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>🔍 Nenhum resultado encontrado.</p>
                )}
            </div>
        </div>
    );
}
