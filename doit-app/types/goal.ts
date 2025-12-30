export interface Goal {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}