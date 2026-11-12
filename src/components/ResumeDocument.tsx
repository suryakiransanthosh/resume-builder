import type { ResumeData } from "../types";

type Props = {
  data: ResumeData;
};

function lines(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function skillsList(skills: string): string[] {
  return skills
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ResumeDocument({ data }: Props) {
  const contact = [data.email, data.phone, data.location, data.linkedin].filter(
    Boolean,
  );

  return (
    <article className="resume">
      <header className="resume-header">
        <h1>{data.fullName || "Your Name"}</h1>
        {contact.length > 0 && (
          <p className="resume-contact">{contact.join(" · ")}</p>
        )}
      </header>

      {data.summary.trim() && (
        <section>
          <h2>Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {data.experience.some((e) => e.company || e.role) && (
        <section>
          <h2>Experience</h2>
          {data.experience.map((exp, i) => {
            if (!exp.company && !exp.role) return null;
            const bullets = lines(exp.bullets);
            const dates = [exp.start, exp.end].filter(Boolean).join(" – ");
            return (
              <div key={i} className="resume-entry">
                <div className="resume-entry-head">
                  <div>
                    <strong>{exp.role || "Role"}</strong>
                    {exp.company && <span className="resume-org"> — {exp.company}</span>}
                  </div>
                  {dates && <span className="resume-dates">{dates}</span>}
                </div>
                {bullets.length > 0 && (
                  <ul>
                    {bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      )}

      {data.education.some((e) => e.school || e.degree) && (
        <section>
          <h2>Education</h2>
          {data.education.map((edu, i) => {
            if (!edu.school && !edu.degree) return null;
            return (
              <div key={i} className="resume-entry">
                <div className="resume-entry-head">
                  <div>
                    <strong>{edu.degree || "Degree"}</strong>
                    {edu.school && <span className="resume-org"> — {edu.school}</span>}
                  </div>
                  {edu.year && <span className="resume-dates">{edu.year}</span>}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {data.skills.trim() && (
        <section>
          <h2>Skills</h2>
          <p className="resume-skills">{skillsList(data.skills).join(" · ")}</p>
        </section>
      )}
    </article>
  );
}
