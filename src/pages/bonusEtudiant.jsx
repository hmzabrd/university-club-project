import { useState } from "react";

export default function BonusEtudiant() {
  const [etudiants, setEtudiants] = useState([
    { nom: "Sara", note: 14 },
    { nom: "Yassine", note: 8 },
    { nom: "Imane", note: 17 },
  ]);

  function ajouterUn() {
    setEtudiants(etudiants.map((e) => ({ ...e, note: e.note + 1 })));
  }

  return (
    <main className="page">
      <div className="container">
        <h1 className="page-title">Bonus Étudiant</h1>

        <div style={{ border: "2px solid var(--cik-blue)", borderRadius: 12, padding: "1.5rem", maxWidth: 400 }}>
          <h3>Notes des étudiants</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {etudiants.map((e, i) => (
              <li key={i} style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>
                {e.nom} — <strong>{e.note}/20</strong>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary" onClick={ajouterUn}>
            Ajouter +1 à tous
          </button>
        </div>
      </div>
    </main>
  );
}
