// import DashboardLayout from '@/components/dashboard/Layout';
// import ProjectTable from '@/components/dashboard/project/Table';

// export default function DashboardPage() {
//   return (
//     <DashboardLayout>
//       {/* <h1>Dashboard Home</h1> */}
//       <ProjectTable></ProjectTable>
//     </DashboardLayout>
//   );
// }
'use client';
import DashboardLayout from '@/components/dashboard/Layout';
import React, { useEffect, useState } from 'react';

import { Project, CreateProjectDto, UpdateProjectDto } from '@/types/project';
import { toast } from 'react-toastify';
import ProjectForm from '@/components/dashboard/project/Form';
import ProjectTable from '@/components/dashboard/project/Table';
import ProjectActions from '@/components/dashboard/project/Actions';
import DeleteProjectModal from '@/components/dashboard/project/ModalDelete';
import Loader from '@/components/dashboard/common/Loader';
import SectionHeader from '@/components/dashboard/common/SectionHeader';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';

const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Description for project 1',
    status: 'Planning',
    createdAt: '2025-06-13T10:00:00.000Z',
    updatedAt: '2025-06-13T10:00:00.000Z'
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Description for project 2',
    status: 'In Progress',
    createdAt: '2025-06-13T10:01:00.000Z',
    updatedAt: '2025-06-13T10:01:00.000Z'
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'Description for project 3',
    status: 'Completed',
    createdAt: '2025-06-13T10:02:00.000Z',
    updatedAt: '2025-06-13T10:02:00.000Z'
  },
  {
    id: 4,
    name: 'Project 4',
    description: 'Description for project 4',
    status: 'Planning',
    createdAt: '2025-06-13T10:03:00.000Z',
    updatedAt: '2025-06-13T10:03:00.000Z'
  },
  {
    id: 5,
    name: 'Project 5',
    description: 'Description for project 5',
    status: 'In Progress',
    createdAt: '2025-06-13T10:04:00.000Z',
    updatedAt: '2025-06-13T10:04:00.000Z'
  },
  {
    id: 6,
    name: 'Project 6',
    description: 'Description for project 6',
    status: 'Completed',
    createdAt: '2025-06-13T10:05:00.000Z',
    updatedAt: '2025-06-13T10:05:00.000Z'
  },
  {
    id: 7,
    name: 'Project 7',
    description: 'Description for project 7',
    status: 'Planning',
    createdAt: '2025-06-13T10:06:00.000Z',
    updatedAt: '2025-06-13T10:06:00.000Z'
  },
  {
    id: 8,
    name: 'Project 8',
    description: 'Description for project 8',
    status: 'In Progress',
    createdAt: '2025-06-13T10:07:00.000Z',
    updatedAt: '2025-06-13T10:07:00.000Z'
  },
  {
    id: 9,
    name: 'Project 9',
    description: 'Description for project 9',
    status: 'Completed',
    createdAt: '2025-06-13T10:08:00.000Z',
    updatedAt: '2025-06-13T10:08:00.000Z'
  },
  {
    id: 10,
    name: 'Project 10',
    description: 'Description for project 10',
    status: 'Planning',
    createdAt: '2025-06-13T10:09:00.000Z',
    updatedAt: '2025-06-13T10:09:00.000Z'
  },
  {
    id: 11,
    name: 'Project 11',
    description: 'Description for project 11',
    status: 'In Progress',
    createdAt: '2025-06-13T10:10:00.000Z',
    updatedAt: '2025-06-13T10:10:00.000Z'
  },
  {
    id: 12,
    name: 'Project 12',
    description: 'Description for project 12',
    status: 'Completed',
    createdAt: '2025-06-13T10:11:00.000Z',
    updatedAt: '2025-06-13T10:11:00.000Z'
  },
  {
    id: 13,
    name: 'Project 13',
    description: 'Description for project 13',
    status: 'Planning',
    createdAt: '2025-06-13T10:12:00.000Z',
    updatedAt: '2025-06-13T10:12:00.000Z'
  },
  {
    id: 14,
    name: 'Project 14',
    description: 'Description for project 14',
    status: 'In Progress',
    createdAt: '2025-06-13T10:13:00.000Z',
    updatedAt: '2025-06-13T10:13:00.000Z'
  },
  {
    id: 15,
    name: 'Project 15',
    description: 'Description for project 15',
    status: 'Completed',
    createdAt: '2025-06-13T10:14:00.000Z',
    updatedAt: '2025-06-13T10:14:00.000Z'
  },
  {
    id: 16,
    name: 'Project 16',
    description: 'Description for project 16',
    status: 'Planning',
    createdAt: '2025-06-13T10:15:00.000Z',
    updatedAt: '2025-06-13T10:15:00.000Z'
  },
  {
    id: 17,
    name: 'Project 17',
    description: 'Description for project 17',
    status: 'In Progress',
    createdAt: '2025-06-13T10:16:00.000Z',
    updatedAt: '2025-06-13T10:16:00.000Z'
  },
  {
    id: 18,
    name: 'Project 18',
    description: 'Description for project 18',
    status: 'Completed',
    createdAt: '2025-06-13T10:17:00.000Z',
    updatedAt: '2025-06-13T10:17:00.000Z'
  },
  {
    id: 19,
    name: 'Project 19',
    description: 'Description for project 19',
    status: 'Planning',
    createdAt: '2025-06-13T10:18:00.000Z',
    updatedAt: '2025-06-13T10:18:00.000Z'
  },
  {
    id: 20,
    name: 'Project 20',
    description: 'Description for project 20',
    status: 'In Progress',
    createdAt: '2025-06-13T10:19:00.000Z',
    updatedAt: '2025-06-13T10:19:00.000Z'
  }
];




const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const formModal = useModal<Project>();
  const deleteModal = useModal<Project>();

  const fetchProjects = async () => {
    try {
      const data: Project[] = mockProjects;
      setProjects(data);
    } catch {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  // const debouncedSearch = useDebounce(search, 300);

  // useEffect(() => {
  //   if (debouncedSearch) {
  //     fetchProjects();
  //   }
  // }, [debouncedSearch, fetchProjects]);
  useEffect(() => {
      fetchProjects();
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleChangeStatus = (value: string) => {
    setStatus(value)
  }

  const handleCreateProject = async (data: CreateProjectDto) => {
    try {
      toast.success('Project created');
      return true;
    } catch {
      toast.error('Failed to create project');
      return false;
    }
  };

  const handleEditProject = async (data: UpdateProjectDto) => {
    if (!formModal.data) return false;
    try {
      toast.success('Project updated');
      return true;
    } catch {
      toast.error('Failed to update project');
      return false;
    }
  };

  const handleDeleteProject = async () => {
    if (!deleteModal.data) return;
    try {
      toast.success('Project deleted');
    } catch {
      toast.error('Failed to delete project');
    } finally {
      deleteModal.close();
    }
  };

  const handleNewProject = () => {
    formModal.open();
  };

  const projectActions = () => (
    <ProjectActions
      onNewProject={handleNewProject}
      onChangeSearch={handleSearch}
      onChangeStatus={handleChangeStatus}
    />
  );

  return (
    <DashboardLayout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 flex-1 overflow-hidden w-full">
        <SectionHeader
          title="Projects"
          description="A list of all projects."
          actions={projectActions()}
        />
        {loading ? (
          <Loader />
        ) : (
          <ProjectTable
            projects={projects}
            onEdit={(project) => formModal.open(project)}
            onDelete={(project) => deleteModal.open(project)}
            currentPage={currentPage}
            pageSize={10}
            onPageChange={(e) => {console.log(e);setCurrentPage(e)}}
          />
        )}

        <ProjectForm
          isOpen={formModal.isOpen}
          onClose={formModal.close}
          onSubmit={formModal.data ? handleEditProject : handleCreateProject}
          project={formModal.data || undefined}
        />

        {deleteModal.isOpen && deleteModal.data && (
          <DeleteProjectModal
            project={deleteModal.data}
            onCancel={deleteModal.close}
            onConfirm={handleDeleteProject}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectList;

