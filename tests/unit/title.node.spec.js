/**
 * @jest-environment node
 */

import axios from "axios";

describe("Netlify functions", () => {
  it("ステータスコードとデータを確認する。", async () => {
    let response;
    try {
      response = await axios.get(
        "http://localhost:9000/.netlify/functions/title?http://example.com"
      );
    } catch (e) {
      console.error(e);
      expect(false).toBeTruthy();
      return;
    }
    expect(response.status).toBe(200);
    expect(response.data).toBe("Example Domain");
  });
});
