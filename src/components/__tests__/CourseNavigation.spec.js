import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import CourseNavigation from '../CourseNavigation.vue';
import router from '../../router';

const chapters = [
  {
    position_y: 0,
    position_x: 0,
    slug: null,
    name: 'I',
  },
  {
    position_y: 1,
    position_x: 1,
    slug: 'I-A',
    name: 'I.A',
  },
  {
    position_y: 2,
    position_x: 1,
    slug: 'I-B',
    name: 'I.B',
  },
];

describe('CourseNavigation', () => {
  it('renders breadcrumb properly', () => {
    const props = {
      slug: 'I-B',
      course: 'Some-course-slug',
      chapters: chapters,
    };
    const wrapper = mount(CourseNavigation, {
      props: props,
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain('Some-course-slug');
  });
});
