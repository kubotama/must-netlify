import { shallowMount } from '@vue/test-utils'
import MustUi from '@/components/MustUi.vue'

describe('Markdownの特殊文字をエスケープする。', () => {
  let wrapper
  beforeAll(() => {
    wrapper = shallowMount(MustUi)
  })

  it('MustUiコンポーネントが存在する。', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('mustTextテキストエリアが存在する。', () => {
    expect(wrapper.find('#mustArea').exists()).toBeTruthy()
  })
})
