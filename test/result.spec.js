import result from '../src/js/result'
import resultTemplate from '../src/containers/resultTemplate'

let restartButtonDom
let totalScoreDom
let averageTimeDom

describe('result test', () => {
  beforeEach(() => {
    document.body.innerHTML = resultTemplate
    restartButtonDom = document.querySelector('.restart-button')
    totalScoreDom = document.querySelector('.total-score')
    averageTimeDom = document.querySelector('.average-time')
  })

  it('sessionStorage에 점수 정보가 없으면 점수와 평균시간이 0으로 표시된다.', () => {
    sessionStorage.clear()
    result.init()
    expect(totalScoreDom.innerHTML).toEqual('0')
    expect(averageTimeDom.innerHTML).toEqual('0')
  })

  it('sessionStorage에 점수 정보가 있으면 점수와 평균시간이 sessionStorage에 저장된 값으 표시된다.', () => {
    sessionStorage.setItem('totalScore', 'TEST_TOTAL_SCORE')
    sessionStorage.setItem('averageTime', 'TEST_AVERAGE_TIME')
    result.init()
    expect(totalScoreDom.innerHTML).toEqual('TEST_TOTAL_SCORE')
    expect(averageTimeDom.innerHTML).toEqual('TEST_AVERAGE_TIME')
  })

  it('다시 시작 버튼을 누르면 location.hash가 game으로 변경된다.', () => {
    result.init()
    restartButtonDom.click()
    expect(location.hash).toEqual('#game')
  })
})
