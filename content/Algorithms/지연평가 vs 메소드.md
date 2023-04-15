---
emoji: 🔮
title: 지연평가 vs 내장 메소드
date: '2022-09-11 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: Algorithms
---

인프런 유인동 쌤의 함수형 프로그래밍 강의를 듣고 프로그래머스에서 알고리즘 시간 측정 테스트를 돌려봤다.

우선 **지연평가**란, 계산의 결과값이 필요할 때까지 계산을 늦추는 기법이라고 한다. 즉, 불필요한 계산을 하지 않는 것이다.

일단은 map,filter에 대한 지연평가만 공부를 한 상태라 관련된 문제를 찾는데 시간이 좀 걸렸다.

좀 찾다보니까 '나누어 떨어지는 숫자 배열' 이라는 문제가 `filter`를 적용한 문제였다.(풀었던 것...)

```js
const curry = (f) => (a, ..._) =>
  //인자가 2개 이상이라면 즉시 실행하고, 아니면 함수를 리턴한 후에 그 이후에 받은 인자를 합쳐서 다시 실행
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const L = {};

L.filter = curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
});

function solution2(arr, divisor) {
  let answer = Array.from(
    L.filter((val) => {
      if (!(val % divisor)) {
        return val;
      }
    }, arr),
  );

  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}

solution2([5, 9, 7, 10], 5);

function solution1(arr, divisor) {
  let answer = arr.filter((val) => {
    if (!(val % divisor)) {
      return val;
    }
  });

  return answer.length === 0 ? [-1] : answer.sort((a, b) => a - b);
}
solution1([5, 9, 7, 10], 5);
```

![](https://velog.velcdn.com/images/gktmd652/post/245b9959-5139-4eb5-a16d-eb879d255afc/image.png)

![](https://velog.velcdn.com/images/gktmd652/post/1f720932-6b9b-40f1-95a6-13f5797cf19b/image.png)

첫번째가 지연 평가를 이용한 것이고 두번째가 일반 내장 메소드를 이용한건데,

보다시피 테스트6에서 5.7초라는 말도 안되는(?) 결과가 나왔다.

![](https://velog.velcdn.com/images/gktmd652/post/af74d670-186f-4161-b295-4059bbe89ef7/image.png)

일반 브라우저에서 직접 구현한 filter, 내장 메소드 filter, 지연평가를 이용한 L.filter를 각각 테스트 해봤는데,

이것만 봐서는 몇 번을 테스트 해봐도 내장 메소드가 측정 시간면으로는 월등히 높은 것을 알 수 있다.

이게 `[1,2,3,4,5]`라는 아주 간단한 배열을 가지고 테스트 한 것이기 때문에 위 같은 결과가 나온 것이라고 생각한다.

```js
console.time("일반");
Array(200000).fill(1).map((number) => number);
console.timeEnd("일반");

const L = {};
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
};

console.time("L");
L.map((num) => num, Array(200000).fill(1));
console.timeEnd("L");

VM3049:3 일반: 8.98876953125 ms
VM3049:10 L: 2.75390625 ms
```

이렇게 20만개의 배열을 가지고 테스트해보면 확실히 차이가 나는 것을 알 수 있다.

실전 코테를 대비해서 지연 평가를 사용하면 시간을 아낄 수 있으리라 생각한다.
