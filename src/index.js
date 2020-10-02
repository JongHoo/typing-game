import Game from './js/game'
import Result from './js/result'
import './global-style.less'

(function () {
  const root = document.querySelector('.app-router')

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
      root.innerHTML = await res.text()

      if (!hash || hash === 'game') {
        Game.init()
      } else if (hash === 'result') {
        Result.init()
      }
    } catch (err) {
      console.error(err)
    }
  }

  window.addEventListener('hashchange', render)
  window.addEventListener('DOMContentLoaded', render)
}())
