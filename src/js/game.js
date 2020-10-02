let leftTimeDom
let scoreDom
let questionWordDom
let inputBoxDom
let startButtonDom

let isPlaying = false
let score
let leftTime
let countInterval
let wordList = []
let questionNumber
let totalSpentTime
let correctCount

// 게임 시작(초기화) 버튼
const onClickStartButton = () => {
  if (!isPlaying) {
    startGame()
  } else {
    stopGame()
  }
}

// 게임 시작
// 1초마다 현재 남은 시간을 1초씩 감소시킨다.
const startGame = async () => {
  isPlaying = true
  questionNumber = 1
  totalSpentTime = 0
  correctCount = 0
  setGameMode()
  countInterval = setInterval(countDown, 1000)
}

// 초기화
const stopGame = () => {
  isPlaying = false
  clearInterval(countInterval)
  startButtonDom.innerHTML = '시작'
  inputBoxDom.innerHTML = '입력'
  inputBoxDom.setAttribute("contenteditable", false)
  leftTimeDom.innerHTML = ''
  scoreDom.innerHTML = ''
  questionWordDom.innerHTML = '문제 단어'
}

// 게임 시작 시 html update
const setGameMode = () => {
  score = wordList.length
  startButtonDom.innerHTML = '초기화'
  inputBoxDom.innerHTML = ''
  inputBoxDom.setAttribute("contenteditable", true)
  inputBoxDom.focus()

  leftTime = wordList[0].second
  scoreDom.innerHTML = score.toString()
  leftTimeDom.innerHTML = leftTime
  questionWordDom.innerHTML = wordList[0].text
}

// 정답 비교
const checkAnswer = () => {
  if (questionWordDom.innerHTML !== inputBoxDom.textContent) {
    score -= 1
    scoreDom.innerHTML = score.toString()
    inputBoxDom.textContent = ''
  } else {
    totalSpentTime += Number(wordList[questionNumber - 1].second) - leftTime
    correctCount++
    inputBoxDom.textContent = ''
    doNextQuestion()
  }
}

// 시간이 감소되는 함수
const countDown = () => {
  if (leftTime > 0) {
    leftTime -= 1
    leftTimeDom.innerHTML = leftTime
  } else {
    score -= 1
    scoreDom.innerHTML = score.toString()
    doNextQuestion()
  }
}

// 다음 문제 출제
const doNextQuestion = () => {
  clearInterval(countInterval)
  if (questionNumber === wordList.length) {
    gameOver()
    return
  }
  questionNumber += 1
  leftTime = wordList[questionNumber - 1].second
  leftTimeDom.innerHTML = leftTime
  questionWordDom.innerHTML = wordList[questionNumber - 1].text
  countInterval = setInterval(countDown, 1000)
}

// 모든 문제를 풀었을 때
const gameOver = () => {
  if (!correctCount) {
    sessionStorage.setItem('totalScore', '0')
    sessionStorage.setItem('averageTime', '0')
  } else {
    sessionStorage.setItem('averageTime', (totalSpentTime / correctCount).toFixed(1))
    sessionStorage.setItem('totalScore', score)
  }
  location.hash = 'result'
}

// 문제 리스트 가져오는 부분
const getWordList = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'https://my-json-server.typicode.com/kakaopay-fe/resources/words', true)
    xhr.responseType = 'json'
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.send()
  })
}

export default {
  async init () {
    leftTimeDom = document.querySelector('.left-time')
    scoreDom = document.querySelector('.score')
    questionWordDom = document.querySelector('.question-word')
    startButtonDom = document.querySelector('.start-button')
    inputBoxDom = document.querySelector('.input-box')

    startButtonDom.addEventListener('click', () => {
      onClickStartButton()
    })
    inputBoxDom.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        checkAnswer()
      }
    })

    wordList = await getWordList()
    console.log(wordList)
  }
}
