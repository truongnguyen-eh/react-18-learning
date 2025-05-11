const params = new URLSearchParams(window.location.search)
const input = params.get('input') || './fundamentals/event-handling/event-lifecycle.ts'

import(/* @vite-ignore */input)
  .then()
  .catch(err => {
    document.body.innerHTML = `<pre style="color:red;">Failed to load entry: ${input}\n${err}</pre>`
  })
