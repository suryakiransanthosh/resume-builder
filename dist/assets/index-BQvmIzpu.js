(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function l(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(a){if(a.ep)return;a.ep=!0;const r=l(a);fetch(a.href,r)}})();const h=[{id:"contact",title:"Contact",subtitle:"How can employers reach you?"},{id:"summary",title:"Summary",subtitle:"A short pitch about you"},{id:"experience",title:"Experience",subtitle:"Your work history"},{id:"education",title:"Education",subtitle:"Schools and degrees"},{id:"skills",title:"Skills",subtitle:"Tools and strengths"}],n={fullName:"",email:"",phone:"",location:"",linkedin:"",summary:"",skills:"",experience:[{company:"",role:"",start:"",end:"",bullets:""}],education:[{school:"",degree:"",year:""}]};let s=0;const i=e=>document.getElementById(e);function v(e){return e.split(`
`).map(t=>t.trim()).filter(Boolean)}function y(e){return e.split(/[,;]/).map(t=>t.trim()).filter(Boolean)}function p(e,t,l={}){const d=n[e]??"",a=l.type||"text",r=l.textarea?`<textarea rows="${l.rows||4}" data-field="${e}" placeholder="${l.placeholder||""}">${o(d)}</textarea>`:`<input type="${a}" data-field="${e}" value="${c(d)}" placeholder="${l.placeholder||""}" />`;return`<label class="${(l.full?" full-width":"").trim()}">${t}${r}</label>`}function o(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function c(e){return o(e).replace(/"/g,"&quot;")}function $(){return`
    <div class="repeatable-list" id="exp-list">
      ${n.experience.map((e,t)=>`
        <div class="repeatable-item" data-exp="${t}">
          <div class="repeatable-header">
            <span>Role ${t+1}</span>
            ${n.experience.length>1?`<button type="button" class="btn-text" data-remove-exp="${t}">Remove</button>`:""}
          </div>
          <div class="field-grid">
            <label>Company<input data-exp-field="company" data-exp="${t}" value="${c(e.company)}" placeholder="Acme Corp" /></label>
            <label>Job title<input data-exp-field="role" data-exp="${t}" value="${c(e.role)}" placeholder="Software Engineer" /></label>
            <label>Start<input data-exp-field="start" data-exp="${t}" value="${c(e.start)}" placeholder="Jan 2022" /></label>
            <label>End<input data-exp-field="end" data-exp="${t}" value="${c(e.end)}" placeholder="Present" /></label>
            <label class="full-width">Highlights (one per line)
              <textarea rows="4" data-exp-field="bullets" data-exp="${t}" placeholder="Built a dashboard used by 10k users&#10;Reduced load time by 40%">${o(e.bullets)}</textarea>
            </label>
          </div>
        </div>`).join("")}
      <button type="button" class="btn-secondary" id="add-exp">+ Add another role</button>
    </div>`}function g(){return`
    <div class="repeatable-list" id="edu-list">
      ${n.education.map((e,t)=>`
        <div class="repeatable-item" data-edu="${t}">
          <div class="repeatable-header">
            <span>Education ${t+1}</span>
            ${n.education.length>1?`<button type="button" class="btn-text" data-remove-edu="${t}">Remove</button>`:""}
          </div>
          <div class="field-grid">
            <label>School<input data-edu-field="school" data-edu="${t}" value="${c(e.school)}" placeholder="State University" /></label>
            <label>Degree<input data-edu-field="degree" data-edu="${t}" value="${c(e.degree)}" placeholder="B.S. Computer Science" /></label>
            <label>Year<input data-edu-field="year" data-edu="${t}" value="${c(e.year)}" placeholder="2020" /></label>
          </div>
        </div>`).join("")}
      <button type="button" class="btn-secondary" id="add-edu">+ Add another school</button>
    </div>`}function m(){const e=h[s];i("step-title").textContent=e.title,i("step-subtitle").textContent=e.subtitle,i("step-label").textContent=`Step ${s+1} of ${h.length}`,i("progress").style.width=`${(s+1)/h.length*100}%`,i("btn-back").disabled=s===0,i("btn-next").textContent=s===h.length-1?"Generate resume":"Continue";const t=i("step-content");e.id==="contact"?t.innerHTML=`<div class="field-grid">
      ${p("fullName","Full name",{placeholder:"Alex Johnson"})}
      ${p("email","Email",{type:"email",placeholder:"alex@email.com"})}
      ${p("phone","Phone",{placeholder:"(555) 123-4567"})}
      ${p("location","Location",{placeholder:"San Francisco, CA"})}
      ${p("linkedin","LinkedIn (optional)",{full:!0,placeholder:"linkedin.com/in/alexjohnson"})}
    </div>`:e.id==="summary"?t.innerHTML=p("summary","Professional summary",{textarea:!0,rows:5,full:!0,placeholder:"Experienced software engineer with 5+ years building web applications..."}):e.id==="experience"?t.innerHTML=$():e.id==="education"?t.innerHTML=g():e.id==="skills"&&(t.innerHTML=p("skills","Skills (comma-separated)",{textarea:!0,rows:4,full:!0,placeholder:"JavaScript, React, TypeScript, Node.js, SQL, Git"})),x()}function f(){document.querySelectorAll("[data-field]").forEach(e=>{n[e.dataset.field]=e.value}),document.querySelectorAll("[data-exp-field]").forEach(e=>{const t=Number(e.dataset.exp);n.experience[t][e.dataset.expField]=e.value}),document.querySelectorAll("[data-edu-field]").forEach(e=>{const t=Number(e.dataset.edu);n.education[t][e.dataset.eduField]=e.value})}function x(){document.querySelectorAll("[data-field]").forEach(l=>{l.addEventListener("input",()=>{n[l.dataset.field]=l.value})}),document.querySelectorAll("[data-exp-field]").forEach(l=>{l.addEventListener("input",()=>{n.experience[Number(l.dataset.exp)][l.dataset.expField]=l.value})}),document.querySelectorAll("[data-edu-field]").forEach(l=>{l.addEventListener("input",()=>{n.education[Number(l.dataset.edu)][l.dataset.eduField]=l.value})});const e=i("add-exp");e&&(e.onclick=()=>{f(),n.experience.push({company:"",role:"",start:"",end:"",bullets:""}),m()}),document.querySelectorAll("[data-remove-exp]").forEach(l=>{l.onclick=()=>{f(),n.experience.splice(Number(l.dataset.removeExp),1),m()}});const t=i("add-edu");t&&(t.onclick=()=>{f(),n.education.push({school:"",degree:"",year:""}),m()}),document.querySelectorAll("[data-remove-edu]").forEach(l=>{l.onclick=()=>{f(),n.education.splice(Number(l.dataset.removeEdu),1),m()}})}function E(){const e=[n.email,n.phone,n.location,n.linkedin].filter(Boolean);let t=`<header class="resume-header">
    <h1>${o(n.fullName||"Your Name")}</h1>
    ${e.length?`<p class="resume-contact">${e.map(o).join(" · ")}</p>`:""}
  </header>`;n.summary.trim()&&(t+=`<section><h2>Summary</h2><p>${o(n.summary)}</p></section>`);const l=n.experience.filter(a=>a.company||a.role);l.length&&(t+="<section><h2>Experience</h2>",l.forEach(a=>{const r=v(a.bullets),u=[a.start,a.end].filter(Boolean).join(" – ");t+=`<div class="resume-entry">
        <div class="resume-entry-head">
          <div><strong>${o(a.role||"Role")}</strong>${a.company?`<span class="resume-org"> — ${o(a.company)}</span>`:""}</div>
          ${u?`<span class="resume-dates">${o(u)}</span>`:""}
        </div>
        ${r.length?`<ul>${r.map(b=>`<li>${o(b)}</li>`).join("")}</ul>`:""}
      </div>`}),t+="</section>");const d=n.education.filter(a=>a.school||a.degree);d.length&&(t+="<section><h2>Education</h2>",d.forEach(a=>{t+=`<div class="resume-entry">
        <div class="resume-entry-head">
          <div><strong>${o(a.degree||"Degree")}</strong>${a.school?`<span class="resume-org"> — ${o(a.school)}</span>`:""}</div>
          ${a.year?`<span class="resume-dates">${o(a.year)}</span>`:""}
        </div>
      </div>`}),t+="</section>"),n.skills.trim()&&(t+=`<section><h2>Skills</h2><p class="resume-skills">${y(n.skills).map(o).join(" · ")}</p></section>`),i("resume-output").innerHTML=t}function S(){f(),E(),i("form-view").hidden=!0,i("preview-view").hidden=!1}function w(){i("preview-view").hidden=!0,i("form-view").hidden=!1}i("btn-next").onclick=()=>{f(),s<h.length-1?(s++,m()):S()};i("btn-back").onclick=()=>{f(),s>0&&(s--,m())};i("btn-edit").onclick=()=>w();i("btn-print").onclick=()=>window.print();m();
