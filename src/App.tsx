import { useState } from "react";
import { Questionnaire } from "./components/Questionnaire";
import { ResumePreview } from "./components/ResumePreview";
import { initialResumeData, type ResumeData } from "./types";

type View = "form" | "preview";

export default function App() {
  const [view, setView] = useState<View>("form");
  const [data, setData] = useState<ResumeData>(initialResumeData);

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon">◆</span>
          <h1>Resume Builder</h1>
        </div>
        <p className="tagline">Answer a few questions — get a polished resume.</p>
      </header>

      {view === "form" ? (
        <Questionnaire
          data={data}
          onChange={setData}
          onComplete={() => setView("preview")}
        />
      ) : (
        <ResumePreview
          data={data}
          onEdit={() => setView("form")}
        />
      )}
    </div>
  );
}
