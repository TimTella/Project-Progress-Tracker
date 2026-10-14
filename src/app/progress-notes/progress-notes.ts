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
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl(''),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });
  progressNote = 'Initial progress note';
}
