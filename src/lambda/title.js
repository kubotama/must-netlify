// import { JSDOM } from 'jsdom'
import cheerio from "cheerio"
import axios from "axios"

export async function handler(event) {
  const url = event.queryStringParameters.url;
  console.log("url: " + url)
  try {
    if (url.length == 0) {
      return {
        statusCode: 204,
        body: ""
      }
    }
    const response = await axios.get(url)
    const body = response.data
    const $ = cheerio.load(body)
    const title = $('title').text()
    console.log("title: " + title)
    return {
      "headers": {
        "Access-Control-Allow-Origin": event.headers.origin
      },
      "statusCode": 200,
      body: title
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 204,
      body: ""
    }
  }
}
