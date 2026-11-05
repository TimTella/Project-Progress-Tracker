import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressNoteApi } from '../progress-note-api';
import { ProgressNote } from '../progress-note';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-progress-notes',
  styleUrl: './progress-notes.css',
  templateUrl: './progress-notes.html',
})
export class ProgressNotes implements OnInit {
  private api = inject(ProgressNoteApi);
  private cdr = inject(ChangeDetectorRef);

  notes: ProgressNote[] = [];
  selectedNote: ProgressNote | null = null; 
  editingId: string | null = null;           
  errorMessage = '';

  progressForm = new FormGroup({
    projectCode: new FormControl('', { nonNullable: true, validators: Validators.required }),
    projectName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    date: new FormControl('', { nonNullable: true, validators: Validators.required }),
    currentStatus: new FormControl('', { nonNullable: true, validators: Validators.required }),
    teamMember: new FormControl('', { nonNullable: true, validators: Validators.required }),
    progressNote: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

  projectNameLookup: { [key: string]: string } = {
    'PPT101': 'Project Progress Tracker',
    'WEB202': 'Website Redesign',
    'APP303': 'Mobile Application Development',
    'DATA404': 'Data Analytics Dashboard'
  };

  ngOnInit() {
    this.loadNotes();
  }

  updateProjectName() {
    const code = (this.progressForm.get('projectCode')?.value ?? '').trim();
    const name = this.projectNameLookup[code];

    if (name) {
      this.progressForm.get('projectName')?.setValue(name);
      this.errorMessage = '';
    } else {
      this.progressForm.get('projectName')?.setValue('');
      this.errorMessage = 'Project code not found.';
    }
  }

  //Read all
  loadNotes() {
    this.api.getNotes().subscribe({
      next: data => { this.notes = data; this.cdr.detectChanges(); },
      error: err => console.error('Error loading notes:', err)
    });
  }

  //Read one
  onView(id: string) {
    this.api.getNote(id).subscribe({
      next: note => { this.selectedNote = note; this.cdr.detectChanges(); },
      error: err => console.error('Error loading note:', err)
    });
  }

  //Fill the form for editing
  onEdit(note: ProgressNote) {
    this.editingId = note._id;
    this.errorMessage = '';
    this.progressForm.patchValue({
      projectCode: note.projectCode,
      projectName: note.projectName,
      date: note.date.substring(0, 10),
      currentStatus: note.currentStatus,
      teamMember: note.teamMember,
      progressNote: note.progressNote
    });
  }

  //CREATE or UPDATE
  onSubmit() {
    if (this.progressForm.invalid) return;
    const data = this.progressForm.getRawValue();

    const request = this.editingId
      ? this.api.updateNote(this.editingId, data)
      : this.api.addNote(data);

    request.subscribe({
      next: () => { this.resetForm(); this.loadNotes(); },
      error: err => console.error('Save failed:', err)
    });
  }

  //DELETE
  onDelete(id: string) {
    this.api.deleteNote(id).subscribe({
      next: () => {
        if (this.selectedNote?._id === id) this.selectedNote = null;
        if (this.editingId === id) this.resetForm();
        this.loadNotes();
      },
      error: err => console.error('Delete failed:', err)
    });
  }

  resetForm() {
    this.editingId = null;
    this.errorMessage = '';
    this.progressForm.reset();
  }
}