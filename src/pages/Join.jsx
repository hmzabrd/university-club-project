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

        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <a href={links.form} target="_blank" rel="noreferrer"
               className="card h-100 join-boot join-boot-blue text-decoration-none">
              <div className="card-body d-flex flex-column justify-content-center text-center py-4">
                <h5 className="card-title fw-bold mb-1">{j.formBtn}</h5>
                <p className="card-text small mb-0">forms.gle/YYC5rPsRwjqKSCrG9</p>
              </div>
            </a>
          </div>
          <div className="col-md-6">
            <a href={links.instagram} target="_blank" rel="noreferrer"
               className="card h-100 join-boot join-boot-outline text-decoration-none">
              <div className="card-body d-flex flex-column justify-content-center text-center py-4">
                <h5 className="card-title fw-bold mb-1">{j.igBtn}</h5>
                <p className="card-text small mb-0">@cik_fsbm</p>
              </div>
            </a>
          </div>
        </div>

        <div className="join-steps">
          <h3>{j.stepsTitle}</h3>
          <ol>
            {j.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>

        <div className="join-why">
          <h3>{j.whyTitle}</h3>
          <ul>
            {j.whyItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="join-info">
          <h3>{j.location}</h3>
          <p>{text.faculty}</p>
          <p className="join-faculty-note">{j.facultyNote}</p>
          <p>
            <a href={links.facultyIg} target="_blank" rel="noreferrer">@fsbm_casablanca</a>
          </p>
        </div>
      </div>
    </main>
  );
}
