export interface ProgressNote {
  _id: string;
  projectCode: string;
  projectName: string;
  date: string;
  currentStatus: string;
  teamMember: string;
  progressNote: string;
}

export type ProgressNoteInput = Omit<ProgressNote, '_id'>;