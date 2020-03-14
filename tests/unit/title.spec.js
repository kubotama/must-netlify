import { JSDOM } from 'jsdom'
// import axios from 'axios'
import request from 'request'

describe('ローカル環境のindex.html', () => {
  it('タイトル',  done => {
    const title ='MarkUp Support Tool by netlify'
    const localUrl = 'http://localhost:8080/'
    request(localUrl, (error, response, body) => {
      expect(new JSDOM(body).window.document.getElementsByTagName('title')[0].textContent).toBe(title)
      done()
    })
  })
})

describe('プレビュー環境のindex.html', () => {
  it('タイトル', done => {
    const title ='MarkUp Support Tool by netlify'
    const netlifyUrl = 'https://must-kubotama.netlify.com/'
    request(netlifyUrl, (error, response, body) => {
      expect(new JSDOM(body).window.document.getElementsByTagName('title')[0].textContent).toBe(title)
      done()
    })
  })
})
