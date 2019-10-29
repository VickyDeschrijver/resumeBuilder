export class Resume {
  profilePic: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  postalCode: number;
  city: string;
  birthDate: string;
  license: string;
  nationality: string;
  about: string;

  name: string;
  address: string;
  contactNo: number;
  email: string;
  socialProfile: string;
  experiences: Experience[] = [];
  educations: Education[] = [];
  languages: Language[] = [];
  references: Reference[] = [];
  otherDetails: string;
  skills: Skill[] = [];

  constructor() {
    this.experiences.push(new Experience());
    this.educations.push(new Education());
    this.languages.push(new Language());
    this.references.push(new Reference());
    this.skills.push(new Skill());
  }
}

export class Experience {
  employer: string;
  jobTitle: string;
  jobDescription: string;
  startDate: string;
  experience: number;
}

export class Education {
  degree: string;
  college: string;
  passingYear: string;
  percentage: number;
}

export class Language {
  language: string;
  speak: string;
  understand: string;
  write: string;
}

export class Reference {
  name: string;
  function: string;
  company: string;
  contact: string;
}

export class Skill {
  value: string;
}
