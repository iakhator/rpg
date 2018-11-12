import {
  shallowMount
} from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders RandomPhoneNumber', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.find('.layout')).toBeTruthy()
  })
})
