import cheerio from "cheerio"
import axios from "axios"

export async function handler(event) {
  const returnData = { statusCode: 0, headers: { "Content-Type": "text/plain" } };
  const url = event.queryStringParameters.url;
  console.log(event.headers)
  console.log("url: " + url)
  try {
    //  URLが指定されていない場合にはstatusCodeを204を返す。
    if (url.length == 0) {
      returnData.statusCode = 204
    }
    else {
      const response = await axios.get(url)
      const body = response.data
      const $ = cheerio.load(body)
      const title = $('title').text()
      console.log("title: " + title)
      // タイトルが取得できた場合にはstatusCodeを200を返す。
      returnData.statusCode = 200
      returnData.body = title
      returnData.isBase64Encoded = false

      // テスト環境では、ボタンが表示されているページとNetlify Functionsのポート番号が違うためCORS制約に違反する。
      // CORS制約を回避するためにAccess-Control-Allow-Origin属性を設定する。
      if (event.headers.host === "localhost:9999" && !event.headers["user-agent"].match(/axios/)) {
        if (event.headers.origin) {
          returnData.headers["Access-Control-Allow-Origin"] = event.headers.origin
        }
        else if (event.headers.referer) {
          returnData.headers["Access-Control-Allow-Origin"] = event.headers.referer
        }
      }
    }
  } catch (error) {
    // 指定されたURLにアクセスできない場合にはstatusCodeを204を返す。
    returnData.statusCode = 204;
  }
  console.log(returnData)
  return returnData;
}
