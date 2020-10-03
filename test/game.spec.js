import game from '../src/js/game'

let leftTimeDom
let scoreDom
let questionWordDom
let inputBoxDom
let startButtonDom

describe('game test', () => {
  beforeEach(async (done) => {
    document.body.innerHTML = `
      <div>
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
})
