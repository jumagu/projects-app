import { mount } from '@vue/test-utils';

import CustomModal from '@/modules/common/components/ui/CustomModal.vue';

describe('Test in <CustomModal />', () => {
  test('Should render the dialog with open state', () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });

    const dialog = wrapper.find('dialog');

    expect(dialog.attributes()).toEqual({ class: 'modal', open: '' });
    expect(dialog.attributes('open')).toBeDefined();
  });

  test('Should render the dialog with close state', () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: false,
      },
    });

    const dialog = wrapper.find('dialog');

    expect(dialog.attributes()).toEqual({ class: 'modal' });
    expect(dialog.attributes('open')).toBeUndefined();
  });

  test('Should render dialog with header, body and actions slots', () => {
    const headerSlotContent = '<h1>hello world</h1>';
    const bodySlotContent = '<div>this is a test</div>';
    const actionsSlotContent = '<button>click me!</button>';

    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
      slots: {
        header: headerSlotContent,
        body: bodySlotContent,
        actions: actionsSlotContent,
      },
    });

    expect(wrapper.html()).toContain(headerSlotContent);
    expect(wrapper.html()).toContain(bodySlotContent);
    expect(wrapper.find('.modal-action').html()).toContain(actionsSlotContent);
  });

  test('Dialog open attribute should change if open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: false,
      },
    });

    const dialog = wrapper.find('dialog');

    expect(dialog.attributes('open')).toBeUndefined();

    await wrapper.setProps({ open: true });
    expect(dialog.attributes('open')).toBeDefined();
  });
});
