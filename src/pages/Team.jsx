/* Team page — club bureau members with photos and roles */

import { useEffect } from "react";
import { team } from "../data/team";
import { fallbackImg } from "../utils/lang";

export default function Team({ text }) {
  const roles = text.team;

  useEffect(() => {
    document.title = `${roles.title} | CIK`;
  }, [roles.title]);

  return (
    <main className="page">
      <div className="container">
        <h1 className="page-title">{roles.title}</h1>
        <p className="lead">{roles.intro}</p>
        <div className="team-grid">
          {team.map((member) => (
            <article key={member.id} className="team-card">
              <div className="team-card-photo">
                <img src={member.photo} alt={member.name} loading="lazy" onError={fallbackImg} />
              </div>
              <div className="team-card-info">
                <h3>{member.name}</h3>
                <p>{roles[member.roleKey]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
