import { Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Resume, Experience, Education, Skill, Language, Reference } from './resume';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  resume = new Resume();

  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

  constructor() {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    console.log(this.resume);
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.languages || this.resume.languages.length === 0) {
      this.resume.languages = [];
      this.resume.languages.push(new Language());
    }
    if (!this.resume.references || this.resume.references.length === 0) {
      this.resume.references = [];
      this.resume.references.push(new Reference());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }
  }

  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.educations.push(new Education());
  }

  addLanguage() {
    this.resume.languages.push(new Language());
  }

  addReference() {
    this.resume.references.push(new Reference());
  }

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.resume = new Resume();
  }

  // getDocumentDefinition() {
  //   sessionStorage.setItem('resume', JSON.stringify(this.resume));
  //   return {
  //     content: [
  //       {
  //         text: 'RESUME',
  //         bold: true,
  //         fontSize: 20,
  //         alignment: 'center',
  //         margin: [0, 0, 0, 20]
  //       },
  //       {
  //         columns: [
  //           [{
  //             text: this.resume.name,
  //             style: 'name'
  //           },
  //           {
  //             text: this.resume.address
  //           },
  //           {
  //             text: 'Email : ' + this.resume.email,
  //           },
  //           {
  //             text: 'Contant No : ' + this.resume.contactNo,
  //           },
  //           {
  //             text: 'GitHub: ' + this.resume.socialProfile,
  //             link: this.resume.socialProfile,
  //             color: 'blue',
  //           }
  //           ],
  //           [
  //             this.getProfilePicObject()
  //           ]
  //         ]
  //       },
  //       {
  //         text: 'Skills',
  //         style: 'header'
  //       },
  //       {
  //         columns: [
  //           {
  //             ul: [
  //               ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
  //             ]
  //           },
  //           {
  //             ul: [
  //               ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
  //             ]
  //           },
  //           {
  //             ul: [
  //               ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         text: 'Experience',
  //         style: 'header'
  //       },
  //       this.getExperienceObject(this.resume.experiences),

  //       {
  //         text: 'Education',
  //         style: 'header'
  //       },
  //       this.getEducationObject(this.resume.educations),
  //       {
  //         text: 'Other Details',
  //         style: 'header'
  //       },
  //       {
  //         text: this.resume.otherDetails
  //       },
  //       {
  //         text: 'Signature',
  //         style: 'sign'
  //       },
  //       {
  //         columns: [
  //           { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit: 100 },
  //           {
  //             text: `(${this.resume.name})`,
  //             alignment: 'right',
  //           }
  //         ]
  //       }
  //     ],
  //     info: {
  //       title: this.resume.name + '_RESUME',
  //       author: this.resume.name,
  //       subject: 'RESUME',
  //       keywords: 'RESUME, ONLINE RESUME',
  //     },
  //     styles: {
  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 20, 0, 10],
  //         decoration: 'underline'
  //       },
  //       name: {
  //         fontSize: 16,
  //         bold: true
  //       },
  //       jobTitle: {
  //         fontSize: 14,
  //         bold: true,
  //         italics: true
  //       },
  //       sign: {
  //         margin: [0, 50, 0, 10],
  //         alignment: 'right',
  //         italics: true
  //       },
  //       tableHeader: {
  //         bold: true,
  //       }
  //     }
  //   };
  // }

  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: this.resume.firstName + ' ' + this.resume.lastName,
          bold: true,
          fontSize: 28,
          alignment: 'right',
          margin: [0, 0, 0, 10],
          color: "#3299bb"
        },
        {
          text: this.resume.jobTitle,
          bold: true,
          fontSize: 18,
          alignment: 'right',
          margin: [0, 0, 0, 20]
        },

        {
          text: 'Personal',
          style: 'header'
        },
        {
          columns: [
            [
              {
                text: 'Born : ' + this.resume.birthDate,
              },
              {
                text: 'Living : ' + this.resume.postalCode + ' ' + this.resume.city,
              },
              {
                text: 'Drivers license : ' + this.resume.license,
              },
              {
                text: 'Nationality : ' + this.resume.nationality,
              },
            ]
          ]
        },
        {
          text: 'Languages',
          style: 'header'
        },
        this.getLanguageObject(this.resume.languages),
        {
          columns: [
            [
              {
                text: 'Born : ' + this.resume.birthDate,
              },
              {
                text: 'Living : ' + this.resume.postalCode + ' ' + this.resume.city,
              },
              {
                text: 'Drivers license : ' + this.resume.license,
              },
              {
                text: 'Nationality : ' + this.resume.nationality,
              },
            ]
          ]
        },
        {
          text: 'About me',
          style: 'header'
        },
        {
          text: this.resume.about
        },
        {
          text: 'References',
          style: 'header'
        },
        this.getReferenceObject(this.resume.references),

      ],
      styles: {
        header: {
          fontSize: 14,
          color: "#3299bb",
          margin: [0, 20, 0, 10]
        },
        name: {
          fontSize: 16,
          bold: true
        },
        jobTitle: {
          fontSize: 14,
          bold: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }

  getExperienceObject(experiences: Experience[]) {

    const exs = [];

    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Experience : ' + experience.experience + ' Months',
              alignment: 'right'
            }
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getReferenceObject(references: Reference[]) {

    const refs = [];

    references.forEach(reference => {
      refs.push(
        [{
          columns: [
            [{
              text: reference.name + ' || ' + reference.company,
              style: 'jobTitle'
            },
            {
              text: reference.function,
            },
            {
              text: 'Contact : ' + reference.contact,
            }]
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...refs
        ]
      }
    };
  }

  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Degree',
            style: 'tableHeader'
          },
          {
            text: 'College',
            style: 'tableHeader'
          },
          {
            text: 'Passing Year',
            style: 'tableHeader'
          },
          {
            text: 'Result',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          })
        ]
      }
    };
  }

  getLanguageObject(languages: Language[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: '',
            style: 'tableHeader'
          },
          {
            text: 'Speak',
            style: 'tableHeader'
          },
          {
            text: 'Understand',
            style: 'tableHeader'
          },
          {
            text: 'Write',
            style: 'tableHeader'
          },
          ],
          ...languages.map(lang => {
            return [lang.language, lang.speak, lang.understand, lang.write];
          })
        ]
      }
    };
  }


  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic,
        width: 75,
        alignment: 'right'
      };
    }
    return null;
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addSkill() {
    this.resume.skills.push(new Skill());
  }

}
