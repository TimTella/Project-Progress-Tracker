import { Routes } from '@angular/router';
import { ProjectCrud } from './project-crud/project-crud';
import { ProjectForm } from './project-form/project-form';

export const routes: Routes = [

  // Display all projects
  {
    path: 'projects',
    component: ProjectCrud
  },

  // Add a new project
  {
    path: 'projects/new',
    component: ProjectForm
  },

  // Edit an existing project
  {
    path: 'projects/edit/:id',
    component: ProjectForm
  }

];