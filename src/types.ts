export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  bullets: string;
};

export type Education = {
  school: string;
  degree: string;
  year: string;
};

export type ResumeData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  skills: string;
  experience: Experience[];
  education: Education[];
};

export const emptyExperience = (): Experience => ({
  company: "",
  role: "",
  start: "",
  end: "",
  bullets: "",
});

export const emptyEducation = (): Education => ({
  school: "",
  degree: "",
  year: "",
});

export const initialResumeData = (): ResumeData => ({
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  summary: "",
  skills: "",
  experience: [emptyExperience()],
  education: [emptyEducation()],
});
