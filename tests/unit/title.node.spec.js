/**
 * @jest-environment node
 */

import axios from "axios";

describe("Netlify Functionsから返されるステータスコードとデータを確認する。", () => {
  it.each`
  url | title | statusCode
  ${"http://example.com"} | ${"Example Domain"} | ${200}
  ${"https://omoitsuki.netlify.app"} | ${"思いつきを書くブログ"} | ${200}
  ${""} | ${""} | ${204}
  ${"http://localhost"} | ${""} | ${204}
  `("$url", async ({url, title, statusCode}) => {
    let response;
    try {
      response = await axios.get(
        "http://localhost:9999/.netlify/functions/title?url=" + url
      );
    } catch (e) {
      console.error(e);
      expect(false).toBeTruthy();
      return;
    }
    expect(response.status).toBe(statusCode);
    expect(response.data).toBe(title);
  });
})
