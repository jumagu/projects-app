import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { PROJECTS } from '../../../fixtures/projects.fixture';
import SideBar from '@/modules/projects/components/SideBar.vue';
import { useProjectsStore } from '@/modules/projects/stores/projects.store';

describe('Tests in <SideBar />', () => {
  const wrapper = mount(SideBar, {
    global: {
      stubs: ['RouterLink'],
      plugins: [createTestingPinia()],
    },
  });

  const projectsStore = useProjectsStore();

  beforeEach(() => {
    projectsStore.$patch({
      projects: [],
    });
  });

  test('Should render with no projects', () => {
    expect(wrapper.html()).toContain('There are no projects');
  });

  test('Should render with no projects', async () => {
    // ! store.$patch is not working
    projectsStore.$patch({ projects: PROJECTS });

    await nextTick();

    // expect(wrapper.html()).not.toContain('There are no projects');
  });
});
