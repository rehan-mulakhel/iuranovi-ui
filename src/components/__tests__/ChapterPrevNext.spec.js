import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ChapterPrevNext from '../ChapterPrevNext.vue';
import router from '../../router';

const chapters = [
  {
    slug: 'Introduction',
  },
  {
    slug: null,
  },
  {
    slug: 'Result',
  },
  {
    slug: null,
  },
  {
    slug: 'Conclusion',
  },
];

describe('ChapterPrevNext', () => {
  it('renders properly', () => {
    const props = { chapters: chapters, current: 'Result' };
    const wrapper = mount(ChapterPrevNext, {
      props: props,
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain('Précédent');
    expect(wrapper.text()).toContain('Suivant');
  });

  it('does not crash when no chapters', () => {
    const props = { chapters: [], current: 'some-slug' };
    const wrapper = mount(ChapterPrevNext, { props: props });
    expect(wrapper.text()).toBe('');
  });

  it('renders only `next` when no `previous` item', () => {
    const props = { chapters: chapters, current: 'Introduction' };
    const wrapper = mount(ChapterPrevNext, {
      props: props,
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain('Suivant');
  });

  it('renders only `previous` when no `next` item', () => {
    const props = { chapters: chapters, current: 'Conclusion' };
    const wrapper = mount(ChapterPrevNext, {
      props: props,
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain('Précédent');
  });
});
