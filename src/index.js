document.body.innerHTML = `
  <h1>Bonjour Webpack !</h1>
  <p class="iconic">Oh le joli icône…</p>
`

require('./footer')

require('./styles/main.css')
require('./styles/titles.scss')

if (module.hot) {
  module.hot.accept()
}
