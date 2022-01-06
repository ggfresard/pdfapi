import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import puppeteer from 'puppeteer'

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000

app.post('/', async (req, res) => {
  console.log(req.body)
  const { markup, format } = req.body
  if (!markup) {
    return res.status(400).send('No markup provided')
  }
  const browser = await puppeteer.launch({})
  const page = await browser.newPage()
  await page.setContent(markup)
  const pdf = await page.pdf({
    format: format || 'a4',
    printBackground: true,
  })
  await browser.close()
  res.setHeader('Content-Type', 'application/pdf')
  res.send(pdf)
})

export default app
