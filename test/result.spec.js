import result from '../src/js/result'

let restartButtonDom
let totalScoreDom
let averageTimeDom

describe('result test', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="result">
        <div class="center result-message">
          Mission Complete!
        </div>
        <div class="center result-score">
          당신의 점수는 <span class="total-score"></span>점입니다.
        </div>
        <div class="center result-comment">
          단어당 평균 답변 시간은 <span class="average-time"></span>초입니다.
        </div>
        <div class="center restart-button">
          다시 시작
        </div>
      </div>
    `
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
