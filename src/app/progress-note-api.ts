import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgressNote, ProgressNoteInput } from './progress-note';

@Injectable({
  providedIn: 'root'
})
export class ProgressNoteApi {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8001/progress-notes';

  getNotes() {
    return this.http.get<ProgressNote[]>(this.apiUrl);
  }

  getNote(id: string) {
    return this.http.get<ProgressNote>(`${this.apiUrl}/${id}`);
  }

  addNote(note: ProgressNoteInput) {
    return this.http.post<ProgressNote>(this.apiUrl, note);
  }

  updateNote(id: string, note: Partial<ProgressNoteInput>) {
    return this.http.put<ProgressNote>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}