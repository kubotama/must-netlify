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

  it('クリックするとonMdLinkが呼び出される。', () => {
    const onMdLink = jest.fn()
    wrapper.setMethods({ onMdLink })
    wrapper.find('#mdLinkButton').trigger('click')
    expect(onMdLink).toHaveBeenCalledTimes(1)
  })
})
