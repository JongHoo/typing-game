import game from './js/game'
import result from './js/result'
import './global-style.less'

const routeInit = () => {
  const routeDom = document.querySelector('.app-router')

  const routes = {
    '': './containers/game.html',
    game: './containers/game.html',
    result: './containers/result.html'
  }

  const render = async () => {
    try {
      const hash = location.hash.replace('#', '')
      const url = routes[hash]
      const res = await fetch(url || './containers/notfound.html')
      routeDom.innerHTML = await res.text()

      if (!hash || hash === 'game') {
        game.init()
      } else if (hash === 'result') {
        result.init()
      }
    } catch (err) {
      console.error(err)
    }
  }

  window.addEventListener('hashchange', render)
  window.addEventListener('DOMContentLoaded', render)
}

routeInit()
