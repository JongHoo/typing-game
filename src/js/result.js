let restartButtonDom
let totalScoreDom
let averageTimeDom

export default {
  init () {
    restartButtonDom = document.querySelector('.restart-button')
    totalScoreDom = document.querySelector('.total-score')
    averageTimeDom = document.querySelector('.average-time')

    totalScoreDom.innerHTML = sessionStorage.getItem('totalScore') || 0
    averageTimeDom.innerHTML = sessionStorage.getItem('averageTime') || 0
    restartButtonDom.addEventListener('click', () => {
      location.hash = 'game'
    })
  }
}
