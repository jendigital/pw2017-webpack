import './styles/main.css'
import './styles/titles.scss'
import uniq from 'lodash/uniq'

document.body.innerHTML = `
  <h1>Bonjour Webpack !</h1>
  <p class="iconic">Oh le joli icône…</p>
`

require('./footer')

if (process.env.NODE_ENV !== 'production') {
  console.log('YOLO DEV')
}

console.log(uniq(['foo', 'bar', 'baz', 'foo', 'baz']))

if (module.hot) {
  module.hot.accept()
}
