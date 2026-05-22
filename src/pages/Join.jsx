import { useEffect } from "react";
import { links } from "../data/siteText";

export default function Join({ text }) {
  const j = text.join;

  useEffect(() => {
    document.title = `${j.title} | CIK`;
  }, [j.title]);

  return (
    <main className="page">
      <div className="container narrow join-page">
        <h1 className="page-title">{j.title}</h1>
        <p className="lead">{j.intro}</p>

        <div className="join-cards">
          <a
            href={links.form}
            target="_blank"
            rel="noreferrer"
            className="join-card"
          >
            <h3>{j.formBtn}</h3>
            <p>forms.gle/YYC5rPsRwjqKSCrG9</p>
          </a>
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer"
            className="join-card join-card-alt"
          >
            <h3>{j.igBtn}</h3>
            <p>@cik_fsbm</p>
          </a>
        </div>

        <div className="join-steps">
          <h3>{j.stepsTitle}</h3>
          <ol>
            {j.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="join-why">
          <h3>{j.whyTitle}</h3>
          <ul>
            {j.whyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="join-info">
          <h3>{j.location}</h3>
          <p>{text.faculty}</p>
          <p className="join-faculty-note">{j.facultyNote}</p>
          <p>
            <a href={links.facultyIg} target="_blank" rel="noreferrer">
              @fsbm_casablanca
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
