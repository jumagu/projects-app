import { shallowMount } from '@vue/test-utils';

import ButtonCircle from '@/modules/common/components/ui/ButtonCircle.vue';

describe('Tests in <ButtonCircle />', () => {
  test('should render the button correctly', () => {
    const wrapper = shallowMount(ButtonCircle);

    expect(wrapper.find('button').classes()).toEqual(['btn', 'btn-circle']);
  });

  test('Should render slot content inside button tag', () => {
    const slotContent = '<span>hello world</span>';

    const wrapper = shallowMount(ButtonCircle, {
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.find('button').html()).toContain(slotContent);
    expect(wrapper.find('button span').exists()).toBe(true);
    expect(wrapper.find('button span').text()).toBe('hello world');
  });
});
