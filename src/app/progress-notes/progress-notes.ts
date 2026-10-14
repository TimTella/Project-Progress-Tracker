import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  imports: [ReactiveFormsModule, FormsModule],
  selector: 'app-progress-notes',
  styleUrl: './progress-notes.css',
  templateUrl: './progress-notes.html',
})
export class ProgressNotes {
  progressForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl(''),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });
  errorMessage = ''
  progressNote = 'Initial progress note';

  projectNameLookup: { [key: string]: string } = {
    'PPT101': 'Project Progress Tracker',
    'WEB202': 'Website Redesign',
    'APP303': 'Mobile Application Development',
    'DATA404': 'Data Analytics Dashboard'
  };

  updateProjectName(){
    const code = (this.progressForm.get('projectCode')?.value ?? '').trim();
    const name = this.projectNameLookup[code];

    if (name) {
      this.progressForm.get('projectName')?.setValue(name);
      this.errorMessage = ''      
    } else {
      this.progressForm.get('projectName')?.setValue('');
      this.errorMessage = 'Project code not found.'
    }
  }
}
