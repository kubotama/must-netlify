import axios from 'axios'
import flushPromises from 'flush-promises'
import { shallowMount } from '@vue/test-utils'
import MustUi from '@/components/MustUi.vue'

let statusCode
let title

jest.mock("axios");
axios.get.mockImplementation((url) =>
  // Promise.resolve(() => {
    // const returnData = {
    //   "http://example.com": {"status": 200, "data": "Example Domain"},
    //   "https://must-kubotama.netlify.app": {"status": 200, "data": "MarkUp Support Tool by netlify"}
    // }
    // console.log(url)
    // return{ status: returnData.url.status, data: returnData.url.data}
      Promise.resolve({
        status: statusCode, data: title
    })
)

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
  url | calledTimes | calledArg | outputText | testStatusCode | testTitle
  ${""} | ${0} | ${""} | ${""} | ${204} | ${""}
  ${"http://example.com"} | ${1} | ${"http://localhost:9000/.netlify/functions/title?url=http://example.com"} | ${"[Example Domain](http://example.com)"} | ${200} | ${"Example Domain"}
  ${"https://must-kubotama.netlify.app"} | ${1} | ${"http://localhost:9000/.netlify/functions/title?url=https://must-kubotama.netlify.app"} | ${"[MarkUp Support Tool by netlify](https://must-kubotama.netlify.app)"} | ${200} | ${"MarkUp Support Tool by netlify"}
  `("$url", async ({ url, calledTimes, calledArg, outputText, testStatusCode, testTitle }) => {
    statusCode = testStatusCode
    title = testTitle
    wrapper.setData({ mustArea: url })
    wrapper.find("#mdLinkButton").trigger("click")
    // mdLinkButton(Markdownのリンク)ボタンをクリックして呼び出されるメソッド(onMdLink)は、非同期処理(axios)を呼び出す。
    // expectの前に非同期処理を終了している必要があるため、ここでflushPromisesを呼び出す。
    await flushPromises()
    expect(axios.get).toBeCalledTimes(calledTimes)

    // calledTimesが0は、モックが呼び出されないため、引数をテストしない。
    if (calledTimes > 0) {
      expect(axios.get).toBeCalledWith(calledArg)
    }
    expect(wrapper.vm.mustArea).toBe(outputText)
  })
})
