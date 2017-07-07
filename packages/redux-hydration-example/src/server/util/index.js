import fs from 'fs'
let Document = fs.readFileSync(__dirname + '/../../../index.html', 'utf8')

export default {
	prepHTML: (jsx, store) => {
	  const state = store.getState()
	  Document = Document.replace('{{CONTENT}}', jsx)
	  Document = Document.replace('{}', JSON.stringify(state))
	  return Document
	}
}