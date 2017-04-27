const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()


app.use('/', express.static(path.join(__dirname, './')))

app.get('/', function (req, resp) {
  let path = './'
  const files = fs.readdirSync(path)
  const res = []
  files.forEach(function (item) {
    if (/\.html$/.test(item)) {
      res.push(`<li><a href="${path+item}">${item}</a></li>`)
    } else {
      const stat = fs.statSync(path + item)
      if (stat.isDirectory()) {
        const inner = fs.readdirSync(path + item)
        inner.forEach((v) => {
          if (/\.html$/.test(v)) {
            res.push(`<li><a href="${path + item + '/' + v}">${item}框架demo ${v}</a></li>`)
          }
        })
      }
    }
  })
  resp.send(`<h1>canvas demo</h1><ul>${res.join('')}</ul>`)
})

app.listen(3333, function (err) {
  if (!err) {
    console.log('listen http://localhost:3333')
  }
})