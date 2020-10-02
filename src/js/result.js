let restartButtonDom
let totalScoreDom
let averageTimeDom

export default {
  init () {
    restartButtonDom = document.querySelector('.restart-button')
    totalScoreDom = document.querySelector('.total-score')
    averageTimeDom = document.querySelector('.average-time')

    totalScoreDom.innerHTML = sessionStorage.getItem('totalScore')
    averageTimeDom.innerHTML = sessionStorage.getItem('averageTime')
    restartButtonDom.addEventListener('click', () => {
      location.hash = 'game'
    })
  }
}
