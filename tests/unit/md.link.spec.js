import { shallowMount } from '@vue/test-utils'
import MustUi from '@/components/MustUi.vue'

describe('mdLinkButtonボタン', () => {
  const idMdLinkButton = '#mdLinkButton'
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MustUi)
  })
  it('存在する。', () => {
    expect(wrapper.find(idMdLinkButton).exists()).toBeTruthy()
  })

  it('クリックするとonMdLinkが呼び出される。', () => {
    const onMdLink = jest.fn()
    wrapper.setMethods({ onMdLink })
    wrapper.find(idMdLinkButton).trigger('click')
    expect(onMdLink).toHaveBeenCalledTimes(1)
  })
})

describe("コードのURLを取得する。", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MustUi);
  });

  it.each`
    beforeUrl                                           | afterUrl
    ${"http://localhost:8080"}                          | ${"http://localhost:9000/.netlify/functions/sample"}
    ${"https://kubotama-sample-functions.netlify.com/"} | ${"https://kubotama-sample-functions.netlify.com/.netlify/functions/sample"}
  `("$beforeUrl -> $afterUrl", ({ beforeUrl, afterUrl }) => {
    expect(wrapper.vm.getFunctionUrl(beforeUrl)).toBe(afterUrl);
  });
});
