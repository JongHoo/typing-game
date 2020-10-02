let isPlaying = false

const onClickStartButton = () => {
  if (!isPlaying) {
    startGame()
  } else {
    stopGame()
  }
}

const startGame = async () => {
  isPlaying = true
  document.querySelector('.start-button').innerHTML = '초기화'
  try {
    const wordList = await getWordList()
    console.log(wordList)
    document.querySelector('.score').innerHTML = wordList.length
  } catch (err) {
    console.log('ERROR :::', err)
  }
}

const stopGame = () => {
  isPlaying = false
  document.querySelector('.start-button').innerHTML = '시작'
}

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
  init () {
    const startButton = document.querySelector('.start-button')
    startButton.addEventListener('click', () => {
      onClickStartButton()
    })
  }
}
