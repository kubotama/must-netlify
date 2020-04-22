import axios from 'axios'
import flushPromises from 'flush-promises'
import { shallowMount } from '@vue/test-utils'
import MustUi from '@/components/MustUi.vue'

jest.mock("axios");
axios.get = jest.fn(() =>
  Promise.resolve({ status: 200, data: "Example Domain"})
);

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
    ${"http://localhost:8080"}                          | ${"http://localhost:9000/.netlify/functions/title"}
    ${"https://kubotama-sample-functions.netlify.com/"} | ${"https://kubotama-sample-functions.netlify.com/.netlify/functions/title"}
  `("$beforeUrl -> $afterUrl", ({ beforeUrl, afterUrl }) => {
    expect(wrapper.vm.getFunctionUrl(beforeUrl)).toBe(afterUrl);
  });
});

describe("ボタンをクリックすると呼び出されるメソッドのテスト", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MustUi);
  });

  it.each`
  url | calledTimes | calledArg | outputText
  ${""} | ${0} | ${""} | ${""}
  ${"http://example.com"} | ${1} | ${"http://localhost:9000/.netlify/functions/title?url=http://example.com"} | ${"[Example Domain](http://example.com)"}
  `("$url", async ({ url, calledTimes, calledArg, outputText }) => {
    wrapper.setData({ mustArea: url })
    wrapper.find("#mdLinkButton").trigger("click")
    await flushPromises()
    expect(axios.get).toBeCalledTimes(calledTimes)
    if (calledTimes > 0) {
      expect(axios.get).toBeCalledWith(calledArg)
      expect(wrapper.vm.mustArea).toBe(outputText)
    }
  })
})
