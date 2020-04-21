/**
 * @jest-environment node
 */

import axios from "axios";

describe("Netlify Functionsから返されるステータスコードとデータを確認する。", () => {
  it("http://example.com", async () => {
    let response;
    try {
      response = await axios.get(
        "http://localhost:9000/.netlify/functions/title?url=http://example.com"
      );
    } catch (e) {
      console.error(e);
      expect(false).toBeTruthy();
      return;
    }
    expect(response.status).toBe(200);
    expect(response.data).toBe("Example Domain");
  });

  it("https://must-kubotama.netlify.app/", async () => {
    let response;
    try {
      response = await axios.get(
        "http://localhost:9000/.netlify/functions/title?url=https://must-kubotama.netlify.app"
      );
    } catch (e) {
      console.error(e);
      expect(false).toBeTruthy();
      return;
    }
    expect(response.status).toBe(200);
    expect(response.data).toBe("MarkUp Support Tool by netlify");
  });
});
