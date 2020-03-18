import { shallowMount } from '@vue/test-utils'
import MustUi from '@/components/MustUi.vue'

describe('Markdownの特殊文字をエスケープする。', () => {
  it('MustUiコンポーネントが存在する。', () => {
    const wrapper = shallowMount(MustUi)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('mustTextテキストエリアが存在する。', () => {
    const wrapper = shallowMount(MustUi)
    expect(wrapper.find('#mustArea').exists()).toBeTruthy()
  })
})
