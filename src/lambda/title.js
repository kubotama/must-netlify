// import { JSDOM } from 'jsdom'
import cheerio from "cheerio"
import axios from "axios"

export async function handler(event) {
  const returnData = { headers: [] };
  const url = event.queryStringParameters.url;
  console.log(event.headers)
  console.log("url: " + url)
  try {
    if (url.length == 0) {
      returnData.statusCode = 204
    }
    else {
      const response = await axios.get(url)
      const body = response.data
      const $ = cheerio.load(body)
      const title = $('title').text()
      console.log("title: " + title)
      returnData.statusCode = 200
      returnData.body = title
      if (event.headers.host === "localhost:9000" && event.headers["user-agent"] != "axios/0.19.2") {
        if (event.headers.origin) {
          returnData.headers["Access-Control-Allow-Origin"] = event.headers.origin
        }
        else {
          returnData.headers["Access-Control-Allow-Origin"] = event.headers.referer
        }
      }
    }
  } catch (error) {
    // console.log(error)
    returnData.statusCode = 204;
  }
  return returnData;
}
