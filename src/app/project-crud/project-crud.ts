import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { ProjectApi } from '../project-api';
import { Project } from '../project';

@Component({
  selector: 'app-project-crud',
  imports: [RouterLink],
  templateUrl: './project-crud.html',
  styleUrl: './project-crud.css'
})
export class ProjectCrud implements OnInit {

  // Access Angular services
  private projectApi = inject(ProjectApi);
  private cdr = inject(ChangeDetectorRef);

  // Store projects retrieved from MongoDB
  projects: Project[] = [];

  // Load projects when the component starts
  ngOnInit() {
    this.loadProjects();
  }

  // GET: Retrieve all projects
  loadProjects() {
    this.projectApi.getProjects().subscribe({
      next: data => {
        this.projects = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Error loading projects:', err);
      }
    });
  }

  // DELETE: Remove the selected project
  onDelete(projectId: string) {
    this.projectApi.deleteProject(projectId)
      .subscribe({
        next: () => {

          // Remove deleted project from the list
          this.projects = this.projects.filter(
            project => project._id !== projectId
          );

          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Delete failed:', err);
        }
      });
  }
}