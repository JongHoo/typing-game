import game from '../src/js/game'

let leftTimeDom
let scoreDom
let questionWordDom
let inputBoxDom
let startButtonDom

describe('game test', () => {
  beforeEach(async (done) => {
    document.body.innerHTML = `
      <div class="game-wrapper">
        <div class="header">
          <div>
            남은 시간 : <span class="left-time"></span>초
          </div>
          <div>
            점수 : <span class="score"></span>점
          </div>
        </div>
        <div class="content">
          <div class="question-word">
            문제 단어
          </div>
          <div class="input-box" contenteditable="false">
            입력
          </div>
          <div class="start-button">
            시작
          </div>
        </div>
      </div>
    `
    game.getWordList = jest.fn().mockResolvedValue([
      { second: 10, text: 'QUESTION1' },
      { second: 5, text: 'QUESTION2' }
    ])

    leftTimeDom = document.querySelector('.left-time')
    scoreDom = document.querySelector('.score')
    questionWordDom = document.querySelector('.question-word')
    startButtonDom = document.querySelector('.start-button')
    inputBoxDom = document.querySelector('.input-box')

    await game.init()
    done()
  })
  afterEach(() => {
    game.stopGame()
    jest.restoreAllMocks()
  })

  it('시작 버튼을 누르면 해당 버튼의 텍스트가 초기화로 변경된다.', () => {
    expect(startButtonDom.innerHTML).toContain('시작')
    startButtonDom.click()
    expect(startButtonDom.innerHTML).toContain('초기화')
  })

  it('시작 후 다시 초기화 버튼을 누르면 해당 버튼의 텍스트가 시작으로 변경된다.', () => {
    expect(startButtonDom.innerHTML).toContain('시작')
    startButtonDom.click()
    expect(startButtonDom.innerHTML).toContain('초기화')
    startButtonDom.click()
    expect(startButtonDom.innerHTML).toContain('시작')
  })

  it('게임이 시작되면 문제단어 영역에 문제 단어가 출제되고, 남은 시간과 점수가 표시된다.', () => {
    startButtonDom.click()
    expect(questionWordDom.innerHTML).toEqual('QUESTION1')
    expect(leftTimeDom.innerHTML).toEqual('10')
    expect(scoreDom.innerHTML).toEqual('2')
  })

  it('게임이 시작된 상태에서 오답을 입력하면 점수가 깎인다.', () => {
    startButtonDom.click()
    expect(scoreDom.innerHTML).toEqual('2')
    inputBoxDom.textContent = 'WRONG_ANSWER'
    inputBoxDom.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }))
    expect(scoreDom.innerHTML).toEqual('1')
  })

  it('게임이 시작된 상태에서 정답을 입력하면 다음 문제가 출제되며 남은시간이 새로 표시된다.', () => {
    startButtonDom.click()
    expect(leftTimeDom.innerHTML).toEqual('10')
    inputBoxDom.textContent = 'QUESTION1'
    inputBoxDom.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }))
    expect(leftTimeDom.innerHTML).toEqual('5')
  })

  it('게임이 시작된 상태에서 모든 문제를 풀면 점수를 sessionStorage에 저장하고 location.hash 가 변경된다.', () => {
    startButtonDom.click()
    inputBoxDom.textContent = 'QUESTION1'
    inputBoxDom.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }))
    inputBoxDom.textContent = 'QUESTION2'
    inputBoxDom.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }))
    expect(sessionStorage.getItem('totalScore')).toEqual('2')
    expect(location.hash).toEqual('#result')
  })
})
