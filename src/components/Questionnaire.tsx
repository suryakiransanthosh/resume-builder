import { useState } from "react";
import {
  emptyEducation,
  emptyExperience,
  type ResumeData,
} from "../types";

const STEPS = [
  { id: "contact", title: "Contact", subtitle: "How can employers reach you?" },
  { id: "summary", title: "Summary", subtitle: "A short pitch about you" },
  { id: "experience", title: "Experience", subtitle: "Your work history" },
  { id: "education", title: "Education", subtitle: "Schools and degrees" },
  { id: "skills", title: "Skills", subtitle: "Tools and strengths" },
] as const;

type Props = {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onComplete: () => void;
};

export function Questionnaire({ data, onChange, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else onComplete();
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const update = (patch: Partial<ResumeData>) => onChange({ ...data, ...patch });

  return (
    <div className="questionnaire">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="step-indicator">
        Step {step + 1} of {STEPS.length}
      </div>

      <div className="card form-card">
        <h2>{current.title}</h2>
        <p className="step-subtitle">{current.subtitle}</p>

        {current.id === "contact" && (
          <div className="field-grid">
            <label>
              Full name
              <input
                value={data.fullName}
                onChange={(e) => update({ fullName: e.target.value })}
                placeholder="Alex Johnson"
                autoFocus
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="alex@email.com"
              />
            </label>
            <label>
              Phone
              <input
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </label>
            <label>
              Location
              <input
                value={data.location}
                onChange={(e) => update({ location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </label>
            <label className="full-width">
              LinkedIn (optional)
              <input
                value={data.linkedin}
                onChange={(e) => update({ linkedin: e.target.value })}
                placeholder="linkedin.com/in/alexjohnson"
              />
            </label>
          </div>
        )}

        {current.id === "summary" && (
          <label>
            Professional summary
            <textarea
              rows={5}
              value={data.summary}
              onChange={(e) => update({ summary: e.target.value })}
              placeholder="Experienced software engineer with 5+ years building web applications..."
              autoFocus
            />
          </label>
        )}

        {current.id === "experience" && (
          <div className="repeatable-list">
            {data.experience.map((exp, i) => (
              <div key={i} className="repeatable-item">
                <div className="repeatable-header">
                  <span>Role {i + 1}</span>
                  {data.experience.length > 1 && (
                    <button
                      type="button"
                      className="btn-text"
                      onClick={() =>
                        update({
                          experience: data.experience.filter((_, j) => j !== i),
                        })
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="field-grid">
                  <label>
                    Company
                    <input
                      value={exp.company}
                      onChange={(e) => {
                        const experience = [...data.experience];
                        experience[i] = { ...exp, company: e.target.value };
                        update({ experience });
                      }}
                      placeholder="Acme Corp"
                    />
                  </label>
                  <label>
                    Job title
                    <input
                      value={exp.role}
                      onChange={(e) => {
                        const experience = [...data.experience];
                        experience[i] = { ...exp, role: e.target.value };
                        update({ experience });
                      }}
                      placeholder="Software Engineer"
                    />
                  </label>
                  <label>
                    Start
                    <input
                      value={exp.start}
                      onChange={(e) => {
                        const experience = [...data.experience];
                        experience[i] = { ...exp, start: e.target.value };
                        update({ experience });
                      }}
                      placeholder="Jan 2022"
                    />
                  </label>
                  <label>
                    End
                    <input
                      value={exp.end}
                      onChange={(e) => {
                        const experience = [...data.experience];
                        experience[i] = { ...exp, end: e.target.value };
                        update({ experience });
                      }}
                      placeholder="Present"
                    />
                  </label>
                  <label className="full-width">
                    Highlights (one per line)
                    <textarea
                      rows={4}
                      value={exp.bullets}
                      onChange={(e) => {
                        const experience = [...data.experience];
                        experience[i] = { ...exp, bullets: e.target.value };
                        update({ experience });
                      }}
                      placeholder={"Built a customer dashboard used by 10k users\nReduced page load time by 40%"}
                    />
                  </label>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                update({ experience: [...data.experience, emptyExperience()] })
              }
            >
              + Add another role
            </button>
          </div>
        )}

        {current.id === "education" && (
          <div className="repeatable-list">
            {data.education.map((edu, i) => (
              <div key={i} className="repeatable-item">
                <div className="repeatable-header">
                  <span>Education {i + 1}</span>
                  {data.education.length > 1 && (
                    <button
                      type="button"
                      className="btn-text"
                      onClick={() =>
                        update({
                          education: data.education.filter((_, j) => j !== i),
                        })
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="field-grid">
                  <label>
                    School
                    <input
                      value={edu.school}
                      onChange={(e) => {
                        const education = [...data.education];
                        education[i] = { ...edu, school: e.target.value };
                        update({ education });
                      }}
                      placeholder="State University"
                    />
                  </label>
                  <label>
                    Degree
                    <input
                      value={edu.degree}
                      onChange={(e) => {
                        const education = [...data.education];
                        education[i] = { ...edu, degree: e.target.value };
                        update({ education });
                      }}
                      placeholder="B.S. Computer Science"
                    />
                  </label>
                  <label>
                    Year
                    <input
                      value={edu.year}
                      onChange={(e) => {
                        const education = [...data.education];
                        education[i] = { ...edu, year: e.target.value };
                        update({ education });
                      }}
                      placeholder="2020"
                    />
                  </label>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                update({ education: [...data.education, emptyEducation()] })
              }
            >
              + Add another school
            </button>
          </div>
        )}

        {current.id === "skills" && (
          <label>
            Skills (comma-separated)
            <textarea
              rows={4}
              value={data.skills}
              onChange={(e) => update({ skills: e.target.value })}
              placeholder="JavaScript, React, TypeScript, Node.js, SQL, Git"
              autoFocus
            />
          </label>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={back}
            disabled={step === 0}
          >
            Back
          </button>
          <button type="button" className="btn-primary" onClick={next}>
            {step === STEPS.length - 1 ? "Generate resume" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
