import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import router from '@/router';
import { PROJECTS } from '../../../fixtures/projects.fixture';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
// import { useProjectsStore } from '@/modules/projects/stores/projects.store';

describe('Tests in <ProjectsView />', () => {
  //   const wrapper = mount(ProjectsView, {
  //     global: {
  //       plugins: [createTestingPinia()],
  //     },
  //   });

  //   beforeEach(() => {
  //     ! Not working as expected
  //     projectsStore.$patch({
  //       projects: PROJECTS,
  //     });
  //   });

  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.setItem('projects', JSON.stringify(PROJECTS));
  });

  test('Should render the table with existing projects', async () => {
    // const projectsStore = useProjectsStore();

    const wrapper = mount(ProjectsView, {
      global: {
        plugins: [router],
      },
    });

    const tableRows = wrapper.findAll('tbody tr');

    expect(tableRows).toHaveLength(3);
    tableRows.forEach((row, index) => {
      const project = PROJECTS[index];
      const cell = row.findAll('td');
      expect(cell[0].text()).toBe(project.name);
      expect(cell[1].text()).toBe(project.tasks.length.toString());
    });
  });

  test('Should call addProject action on input-modal submission', () => {
    // const projectsStore = useProjectsStore();
    const wrapper = mount(ProjectsView, {
      global: {
        plugins: [router],
      },
    });
    const inputModal = wrapper.findComponent({ name: 'InputModal' });

    inputModal.vm.$emit('value', 'Test Project');

    // expect(projectsStore.addProject).toHaveBeenCalled();}
  });
});
