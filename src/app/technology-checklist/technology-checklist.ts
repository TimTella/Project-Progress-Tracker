import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-technology-checklist',
  styleUrl: './technology-checklist.css',
  templateUrl: './technology-checklist.html',
})
export class TechnologyChecklist {
  checklistComplete = false;
  buttonName = 'Mark Checklist Complete';
  completeChecklist() {
    this.checklistComplete = true;
    this.buttonName = 'Checklist Completed';
  }
  hoverMessage = '';

  showMessage() {
    this.hoverMessage = 'Review the checklist before marking it complete.';
  }
}

