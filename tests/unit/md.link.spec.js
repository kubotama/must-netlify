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
  it("テキスト領域が空白", () => {
    wrapper.setData({ mustArea: "" })
    wrapper.find("#mdLinkButton").trigger('click')
    expect(axios.get.mock.calls.length).toBe(0)
    expect(wrapper.vm.mustArea).toBe("")
  })

  it("http://example.com", async () => {
    wrapper.setData({ mustArea: "http://example.com" })
    wrapper.find("#mdLinkButton").trigger("click")
    await flushPromises()
    expect(axios.get.mock.calls.length).toBe(1)
    expect(axios.get.mock.calls[0][0]).toBe("http://localhost:9000/.netlify/functions/title?url=http://example.com")
    expect(wrapper.vm.mustArea).toBe("[Example Domain](http://example.com)")
  })
})
