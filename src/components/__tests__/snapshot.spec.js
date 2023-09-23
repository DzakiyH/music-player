import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('Snapshots SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docID: 'abc',
      modifiedName: 'test',
      displayName: 'test',
      commentCount: 5
    }
    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
