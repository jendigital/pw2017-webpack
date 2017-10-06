import './styles/main.css'
import './styles/titles.scss'

document.body.innerHTML = `
  <h1>Bonjour Webpack !</h1>
  <p class="iconic">Oh le joli icône…</p>
`

require('./footer')

if (module.hot) {
  module.hot.accept()
}
