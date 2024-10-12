import { mount } from '@vue/test-utils';
import { useRouter, useRoute } from 'vue-router';

import { PROJECTS } from '../../../fixtures/projects.fixture';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { useProjectsStore } from '@/modules/projects/stores/projects.store';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    replace: () => {},
  })),
}));
vi.mock('@/modules/projects/stores/projects.store');

// vi.mock('@/modules/projects/stores/projects.store', async (importOriginal) => {
//   const mod: any = await importOriginal();
//   return {
//     ...mod,
//     findProjectById: vi.fn(() => PROJECTS[0]),
//   };
// });

describe('Tests in project <ProjectView />', () => {
  test('Should be rendered with a project', async () => {
    const projectId = '1';

    (useRoute as any).mockImplementationOnce(() => ({
      params: {
        id: projectId,
      },
    }));

    (useProjectsStore as any).mockReturnValue({
      findProjectById: vi.fn(() => PROJECTS[0]),
    });

    const wrapper = mount(ProjectView);

    const tableRows = wrapper.findAll('tbody tr');

    expect(tableRows).toHaveLength(PROJECTS[0].tasks.length);
  });

  test('Should redirect to "/" if the project does not exist', async () => {
    const projectId = 'abc';

    (useRoute as any).mockImplementationOnce(() => ({
      params: {
        id: projectId,
      },
    }));

    const replace = vi.fn();
    (useRouter as any).mockImplementationOnce(() => ({
      replace,
    }));

    (useProjectsStore as any).mockReturnValue({
      findProjectById: vi.fn(() => undefined),
    });

    mount(ProjectView);

    expect(replace).toHaveBeenCalled();
    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith('/');
  });
});
