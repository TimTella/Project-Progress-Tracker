import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { ProjectApi } from '../project-api';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css'
})
export class ProjectForm implements OnInit {

  // Access Angular services
  private fb = inject(FormBuilder);
  private projectApi = inject(ProjectApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  // Store project ID when editing
  projectId: string | null = null;

  // Define the reactive form
  projectForm = this.fb.nonNullable.group({
    projectName: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    status: ['Not Started', Validators.required],
    teamMember: ['', Validators.required],
    progressNote: ['']
  });

  // Load project information when editing
  ngOnInit() {

    // Read project ID from the URL
    this.projectId =
      this.route.snapshot.paramMap.get('id');

    if (this.projectId) {

      // GET: Retrieve existing project
      this.projectApi.getProject(this.projectId)
        .subscribe({
          next: project => {

            // Prepopulate the form
            this.projectForm.patchValue({
              projectName: project.projectName,
              description: project.description,
              startDate: project.startDate.substring(0, 10),
              status: project.status,
              teamMember: project.teamMember,
              progressNote: project.progressNote
            });

            this.cdr.detectChanges();
          },

          error: err => {
            console.error('Error loading project:', err);
          }
        });
    }
  }

  // Add a new project or update an existing project
  onSubmit() {

    // Check form validation
    if (this.projectForm.invalid) return;

    const projectData = this.projectForm.getRawValue();

    if (this.projectId) {

      // PUT: Update existing project
      this.projectApi.updateProject(
        this.projectId,
        projectData
      ).subscribe({
        next: () => {
          console.log('Project updated successfully');
          this.router.navigate(['/projects']);
        },
        error: err => {
          console.error('Update failed:', err);
        }
      });

    } else {

      // POST: Create new project
      this.projectApi.addProject(projectData)
        .subscribe({
          next: () => {
            console.log('Project saved successfully');
            this.router.navigate(['/projects']);
          },
          error: err => {
            console.error('Save failed:', err);
          }
        });
    }
  }
}