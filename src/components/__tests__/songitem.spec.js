import SongItem from '@/components/SongItem.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

describe('SongItem.vue', () => {
  test('renders song.displayName', () => {
    const song = {
      displayName: 'test'
    }

    const wrapper = shallowMount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      }
    })

    const compositionAuthor = wrapper.find('.text-gray-500')

    expect(compositionAuthor.text()).toBe(song.displayName)
  })

  test('renders song.docID in id attribute', () => {
    const song = {
      docID: 'abc'
    }

    const wrapper = shallowMount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      }
    })

    // expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`)
    expect(wrapper.classes()).toContain(`song-id-${song.docID}`)
  })
})
