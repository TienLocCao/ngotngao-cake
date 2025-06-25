export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  status: ProjectStatus;
}

export type CreateProjectDto = ProjectFormData;

export interface UpdateProjectDto extends Partial<ProjectFormData> {}