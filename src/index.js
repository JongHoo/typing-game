import game from './js/game'
import result from './js/result'
import './global-style.less'
import gameTemplate from './containers/gameTemplate'
import resultTemplate from './containers/resultTemplate'
import notfoundTemplate from './containers/notfoundTemplate'

const routeInit = () => {
  const routeDom = document.querySelector('.app-router')

  const routes = {
    '': gameTemplate,
    game: gameTemplate,
    result: resultTemplate,
    notfound: notfoundTemplate
  }

  const render = async () => {
    try {
      const hash = location.hash.replace('#', '')
      routeDom.innerHTML = routes[hash] || routes.notfound

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
