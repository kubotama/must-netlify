import { shallowMount } from '@vue/test-utils'
import MustUi from '@/components/MustUi.vue'

describe('mdLinkButtonボタン', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MustUi)
  })
  it('存在する。', () => {
    expect(wrapper.find('#mdLinkButton').exists()).toBeTruthy()
  })
})
