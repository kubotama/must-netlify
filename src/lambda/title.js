// import { JSDOM } from 'jsdom'
import cheerio from "cheerio"
import axios from "axios"

export async function handler(event) {
  const url = event.queryStringParameters.url;
  console.log("url: " + url)
  try {
    const response = await axios.get(url)
    const body = response.data
    const $ = cheerio.load(body)
    const title = $('title').text()
    console.log("title: " + title)
    return {
      statusCode: 200,
      body: title
    }
  } catch (error) {
    console.log(error)
  }
}
