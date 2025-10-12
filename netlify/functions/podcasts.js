import { parseStringPromise } from 'xml2js'

export async function handler() {
  try {
    const response = await fetch('https://feeds.megaphone.fm/HSW5755001789') // Use native fetch
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const xml = await response.text()
    const result = await parseStringPromise(xml)
    const items = result.rss.channel[0].item.map(item => ({
      title: item.title[0],
      description: item.description[0],
      link: item.link[0],
      pubDate: item.pubDate[0],
      enclosure: item.enclosure[0].$
    }))
    return { statusCode: 200, body: JSON.stringify(items) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Parse error' }) }
  }
}