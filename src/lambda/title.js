// import { JSDOM } from 'jsdom'
import cheerio from "cheerio"
import axios from "axios"

export async function handler(event) {
// export function handler(event, context, callback) {
  const url = event.queryStringParameters.url;
  console.log("url: " + url)
  try {
    const response = await axios.get(url)
    const body = response.data

    // const dom = new JSDOM(body)
    const $ = cheerio.load(body)
    // const title = dom.window.document.getElementsByTagName('title')[0].textContent
    // const title = "Example Domain"
    const title = $('title').text()
    console.log("title: " + title)
    return {
      statusCode: 200,
      body: title
    }
  } catch (error) {
    console.log(error)
  }
  // const promise = new Promise((resolve, reject) => {
  //   axios.get(url)
  // })
  // axios.get(event.queryStringParameters.url).then(({ data }) => {
  //   const title = "Example Domain"
  //   console.log("title: " + title)
  //   callback(null, {
  //     statusCode: 200,
  //     body: title
  //   })
  // })
  // .catch(error => {
  //   console.log("error")
  //   callback(null, {
  //     statusCode: 204,
  //     body: ""
  //   })
  // })
    // console.log(response)
  // console.log(response.data)
  // const body = response.data

  // const dom = new JSDOM(body)
  // const title = dom.window.document.getElementsByTagName('title')[0].textContent
}
