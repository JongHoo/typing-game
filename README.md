# Typing Game
출제되는 단어들을 각각의 시간 내에 입력해야 하는 게임  
(with Vanilla)

## 목차
1. Routing
1. Game 화면
1. Result 화면

## Routing
- location.hash 를 이용하여 SPA를 구현
- hash 주소를 읽어온 다음 해당 주소에 맞는 template을 읽어와 routing 대상 DOM 에 template을 넣어줌
- 초기 로딩 시에 render를 위해 DOMContentLoaded 이벤트와, hash 변경 감지를 위해 hashchange 이벤트에 위의 render handler를 걸어줌
- 페이지 이동 시 해당 페이지의 초기화(init) 함수 호출
- main 화면이 곧 game 화면이므로 hash가 존재하지 않을 시 game 화면으로 routing
- game, result 외의 hash 값이 들어오면 별도의 404 에러 페이지 출력

## Game 화면
- 게임 시작 전 미리 문제 목록을 읽어옴
- 게임이 시작되면 가장 첫번째 문제의 text를 문제 단어 영역에 출력. 첫번째 문제의 second를 남은 시간 영역에 출력
- 1초 텀으로 interval을 생성하여 남은 시간이 0이 될 때까지 감소
- 남은 시간이 모두 소진되거나, 정답을 맞추면 해당 interval을 종료시킴
- 남은 문제가 있다면 위의 과정을 반복함
- 평균 답변 시간 계산을 위해 정답 시 정답 카운트와 정답에 사용된 시간 정보를 증가시키면서 저장
- 모든 문제를 해결한 경우 점수와 평균 답변 시간 정보를 sessionStorage에 저장
- hash 변경을 통해 result 화면으로 전환

## Result 화면
- 점수와 평균 답변 시간을 sessionStorage 에서 읽어와 출력. (없다면 각각 0으로 출력)
- 다시 시작 버튼을 통해 hash 변경 및 game 화면으로 다시 전환.
