import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ModalArticle from '../ModalArticle.vue';

describe('ModalArticle', () => {
  it('does not display when boolean is set to `false`', () => {
    const wrapper = mount(ModalArticle, { props: { show: false } });
    expect(wrapper.find('.modal-container').exists()).toBe(false);
  });

  it('renders properly when boolean set to `true`', () => {
    const wrapper = mount(ModalArticle, { props: { show: true } });
    expect(wrapper.find('.modal-container').exists()).toBe(true);
  });

  it('closes the modal when click on `x` button', () => {
    const wrapper = mount(ModalArticle, { props: { show: true } });
    wrapper.find('.modal-default-button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
  });

  it('closes the modal when click on the overlay', () => {
    const wrapper = mount(ModalArticle, { props: { show: true } });
    wrapper.find('.modal-mask').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
  });

  it('does not close the modal when click on its body', () => {
    const wrapper = mount(ModalArticle, { props: { show: true } });
    wrapper.find('.modal-body').trigger('click');
    expect(wrapper.emitted()).not.toHaveProperty('close');
  });
});
