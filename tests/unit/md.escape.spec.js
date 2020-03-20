import { shallowMount } from '@vue/test-utils'
import MustUi from '@/components/MustUi.vue'

describe('Markdownの特殊文字をエスケープする。', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MustUi)
  })

  describe('MustUiコンポーネント', () => {
  it('存在する。', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })

  describe('mustAreaテキストエリア', () => {
    it('存在する。', () => {
      expect(wrapper.find('#mustArea').exists()).toBeTruthy()
    })

    it('初期値は\'\'である。', () => {
      expect(wrapper.vm.mustArea).toBe('')
    })
  })

  describe('mdEscapeButtonボタン', () => {
    const idMdEscapeButton = '#mdEscapeButton'
    it('存在する。', () => {
      expect(wrapper.find(idMdEscapeButton).exists()).toBeTruthy()
    })

    it('クリックするとonMdEscapeが呼び出される。', () => {
      const onMdEscape = jest.fn()
      wrapper.setMethods({ onMdEscape })
      wrapper.find(idMdEscapeButton).trigger('click')
      expect(onMdEscape).toHaveBeenCalledTimes(1)
    })
  })

  describe('特殊文字が一文字', () => {
    const idMdEscapeButton = '#mdEscapeButton'
    it('\\ -> \\\\', () => {
      wrapper.setData({ mustArea: '\\' })
      wrapper.find(idMdEscapeButton).trigger('click')
      expect(wrapper.vm.mustArea).toBe('\\\\')
    })
  })
})
