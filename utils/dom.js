export function createDOM(template) {
  const parser = new DOMParser()
  const html = parser.parseFromString(template, "text/html")
  return html.body.firstChild
}