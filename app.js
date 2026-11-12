const STEPS = [
  { id: "contact", title: "Contact", subtitle: "How can employers reach you?" },
  { id: "summary", title: "Summary", subtitle: "A short pitch about you" },
  { id: "experience", title: "Experience", subtitle: "Your work history" },
  { id: "education", title: "Education", subtitle: "Schools and degrees" },
  { id: "skills", title: "Skills", subtitle: "Tools and strengths" },
];

const data = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  summary: "",
  skills: "",
  experience: [{ company: "", role: "", start: "", end: "", bullets: "" }],
  education: [{ school: "", degree: "", year: "" }],
};

let step = 0;

const $ = (id) => document.getElementById(id);

function lines(text) {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function skillsList(skills) {
  return skills
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function field(name, label, opts = {}) {
  const val = data[name] ?? "";
  const type = opts.type || "text";
  const tag = opts.textarea
    ? `<textarea rows="${opts.rows || 4}" data-field="${name}" placeholder="${opts.placeholder || ""}">${escapeHtml(val)}</textarea>`
    : `<input type="${type}" data-field="${name}" value="${escapeAttr(val)}" placeholder="${opts.placeholder || ""}" />`;
  const cls = opts.full ? " full-width" : "";
  return `<label class="${cls.trim()}">${label}${tag}</label>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

function renderExperienceStep() {
  return `
    <div class="repeatable-list" id="exp-list">
      ${data.experience
        .map(
          (exp, i) => `
        <div class="repeatable-item" data-exp="${i}">
          <div class="repeatable-header">
            <span>Role ${i + 1}</span>
            ${data.experience.length > 1 ? `<button type="button" class="btn-text" data-remove-exp="${i}">Remove</button>` : ""}
          </div>
          <div class="field-grid">
            <label>Company<input data-exp-field="company" data-exp="${i}" value="${escapeAttr(exp.company)}" placeholder="Acme Corp" /></label>
            <label>Job title<input data-exp-field="role" data-exp="${i}" value="${escapeAttr(exp.role)}" placeholder="Software Engineer" /></label>
            <label>Start<input data-exp-field="start" data-exp="${i}" value="${escapeAttr(exp.start)}" placeholder="Jan 2022" /></label>
            <label>End<input data-exp-field="end" data-exp="${i}" value="${escapeAttr(exp.end)}" placeholder="Present" /></label>
            <label class="full-width">Highlights (one per line)
              <textarea rows="4" data-exp-field="bullets" data-exp="${i}" placeholder="Built a dashboard used by 10k users&#10;Reduced load time by 40%">${escapeHtml(exp.bullets)}</textarea>
            </label>
          </div>
        </div>`,
        )
        .join("")}
      <button type="button" class="btn-secondary" id="add-exp">+ Add another role</button>
    </div>`;
}

function renderEducationStep() {
  return `
    <div class="repeatable-list" id="edu-list">
      ${data.education
        .map(
          (edu, i) => `
        <div class="repeatable-item" data-edu="${i}">
          <div class="repeatable-header">
            <span>Education ${i + 1}</span>
            ${data.education.length > 1 ? `<button type="button" class="btn-text" data-remove-edu="${i}">Remove</button>` : ""}
          </div>
          <div class="field-grid">
            <label>School<input data-edu-field="school" data-edu="${i}" value="${escapeAttr(edu.school)}" placeholder="State University" /></label>
            <label>Degree<input data-edu-field="degree" data-edu="${i}" value="${escapeAttr(edu.degree)}" placeholder="B.S. Computer Science" /></label>
            <label>Year<input data-edu-field="year" data-edu="${i}" value="${escapeAttr(edu.year)}" placeholder="2020" /></label>
          </div>
        </div>`,
        )
        .join("")}
      <button type="button" class="btn-secondary" id="add-edu">+ Add another school</button>
    </div>`;
}

function renderStep() {
  const s = STEPS[step];
  $("step-title").textContent = s.title;
  $("step-subtitle").textContent = s.subtitle;
  $("step-label").textContent = `Step ${step + 1} of ${STEPS.length}`;
  $("progress").style.width = `${((step + 1) / STEPS.length) * 100}%`;
  $("btn-back").disabled = step === 0;
  $("btn-next").textContent = step === STEPS.length - 1 ? "Generate resume" : "Continue";

  const content = $("step-content");
  if (s.id === "contact") {
    content.innerHTML = `<div class="field-grid">
      ${field("fullName", "Full name", { placeholder: "Alex Johnson" })}
      ${field("email", "Email", { type: "email", placeholder: "alex@email.com" })}
      ${field("phone", "Phone", { placeholder: "(555) 123-4567" })}
      ${field("location", "Location", { placeholder: "San Francisco, CA" })}
      ${field("linkedin", "LinkedIn (optional)", { full: true, placeholder: "linkedin.com/in/alexjohnson" })}
    </div>`;
  } else if (s.id === "summary") {
    content.innerHTML = field("summary", "Professional summary", {
      textarea: true,
      rows: 5,
      full: true,
      placeholder:
        "Experienced software engineer with 5+ years building web applications...",
    });
  } else if (s.id === "experience") {
    content.innerHTML = renderExperienceStep();
  } else if (s.id === "education") {
    content.innerHTML = renderEducationStep();
  } else if (s.id === "skills") {
    content.innerHTML = field("skills", "Skills (comma-separated)", {
      textarea: true,
      rows: 4,
      full: true,
      placeholder: "JavaScript, React, TypeScript, Node.js, SQL, Git",
    });
  }

  bindInputs();
}

function syncFromInputs() {
  document.querySelectorAll("[data-field]").forEach((el) => {
    data[el.dataset.field] = el.value;
  });
  document.querySelectorAll("[data-exp-field]").forEach((el) => {
    const i = Number(el.dataset.exp);
    data.experience[i][el.dataset.expField] = el.value;
  });
  document.querySelectorAll("[data-edu-field]").forEach((el) => {
    const i = Number(el.dataset.edu);
    data.education[i][el.dataset.eduField] = el.value;
  });
}

function bindInputs() {
  document.querySelectorAll("[data-field]").forEach((el) => {
    el.addEventListener("input", () => {
      data[el.dataset.field] = el.value;
    });
  });

  document.querySelectorAll("[data-exp-field]").forEach((el) => {
    el.addEventListener("input", () => {
      data.experience[Number(el.dataset.exp)][el.dataset.expField] = el.value;
    });
  });

  document.querySelectorAll("[data-edu-field]").forEach((el) => {
    el.addEventListener("input", () => {
      data.education[Number(el.dataset.edu)][el.dataset.eduField] = el.value;
    });
  });

  const addExp = $("add-exp");
  if (addExp) {
    addExp.onclick = () => {
      syncFromInputs();
      data.experience.push({ company: "", role: "", start: "", end: "", bullets: "" });
      renderStep();
    };
  }

  document.querySelectorAll("[data-remove-exp]").forEach((btn) => {
    btn.onclick = () => {
      syncFromInputs();
      data.experience.splice(Number(btn.dataset.removeExp), 1);
      renderStep();
    };
  });

  const addEdu = $("add-edu");
  if (addEdu) {
    addEdu.onclick = () => {
      syncFromInputs();
      data.education.push({ school: "", degree: "", year: "" });
      renderStep();
    };
  }

  document.querySelectorAll("[data-remove-edu]").forEach((btn) => {
    btn.onclick = () => {
      syncFromInputs();
      data.education.splice(Number(btn.dataset.removeEdu), 1);
      renderStep();
    };
  });
}

function renderResume() {
  const contact = [data.email, data.phone, data.location, data.linkedin].filter(Boolean);
  let html = `<header class="resume-header">
    <h1>${escapeHtml(data.fullName || "Your Name")}</h1>
    ${contact.length ? `<p class="resume-contact">${contact.map(escapeHtml).join(" · ")}</p>` : ""}
  </header>`;

  if (data.summary.trim()) {
    html += `<section><h2>Summary</h2><p>${escapeHtml(data.summary)}</p></section>`;
  }

  const expEntries = data.experience.filter((e) => e.company || e.role);
  if (expEntries.length) {
    html += "<section><h2>Experience</h2>";
    expEntries.forEach((exp) => {
      const bullets = lines(exp.bullets);
      const dates = [exp.start, exp.end].filter(Boolean).join(" – ");
      html += `<div class="resume-entry">
        <div class="resume-entry-head">
          <div><strong>${escapeHtml(exp.role || "Role")}</strong>${exp.company ? `<span class="resume-org"> — ${escapeHtml(exp.company)}</span>` : ""}</div>
          ${dates ? `<span class="resume-dates">${escapeHtml(dates)}</span>` : ""}
        </div>
        ${bullets.length ? `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>` : ""}
      </div>`;
    });
    html += "</section>";
  }

  const eduEntries = data.education.filter((e) => e.school || e.degree);
  if (eduEntries.length) {
    html += "<section><h2>Education</h2>";
    eduEntries.forEach((edu) => {
      html += `<div class="resume-entry">
        <div class="resume-entry-head">
          <div><strong>${escapeHtml(edu.degree || "Degree")}</strong>${edu.school ? `<span class="resume-org"> — ${escapeHtml(edu.school)}</span>` : ""}</div>
          ${edu.year ? `<span class="resume-dates">${escapeHtml(edu.year)}</span>` : ""}
        </div>
      </div>`;
    });
    html += "</section>";
  }

  if (data.skills.trim()) {
    html += `<section><h2>Skills</h2><p class="resume-skills">${skillsList(data.skills).map(escapeHtml).join(" · ")}</p></section>`;
  }

  $("resume-output").innerHTML = html;
}

function showPreview() {
  syncFromInputs();
  renderResume();
  $("form-view").hidden = true;
  $("preview-view").hidden = false;
}

function showForm() {
  $("preview-view").hidden = true;
  $("form-view").hidden = false;
}

$("btn-next").onclick = () => {
  syncFromInputs();
  if (step < STEPS.length - 1) {
    step++;
    renderStep();
  } else {
    showPreview();
  }
};

$("btn-back").onclick = () => {
  syncFromInputs();
  if (step > 0) {
    step--;
    renderStep();
  }
};

$("btn-edit").onclick = () => showForm();
$("btn-print").onclick = () => window.print();

renderStep();
