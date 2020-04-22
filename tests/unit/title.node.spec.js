/**
 * @jest-environment node
 */

import axios from "axios";

describe("Netlify Functionsから返されるステータスコードとデータを確認する。", () => {
  it.each`
  url | title
  ${"http://example.com"} | ${"Example Domain"}
  ${"https://must-kubotama.netlify.app"} | ${"MarkUp Support Tool by netlify"}
  `("$url", async ({url, title}) => {
    let response;
    try {
      response = await axios.get(
        "http://localhost:9000/.netlify/functions/title?url=" + url
      );
    } catch (e) {
      console.error(e);
      expect(false).toBeTruthy();
      return;
    }
    expect(response.status).toBe(200);
    expect(response.data).toBe(title);
  });
})
