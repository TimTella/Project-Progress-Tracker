import { TechnologyChecklist } from './technology-checklist/technology-checklist';
import { ProgressNotes } from './progress-notes/progress-notes';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';
import { ProjectOverview } from './project-overview/project-overview';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MilestoneApi } from './milestone-api/milestone-api';

@Component({
  imports: [RouterOutlet, MilestoneTracker, ProgressNotes, ProjectOverview, TechnologyChecklist, MilestoneApi],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('project-progess-tracker');
}
