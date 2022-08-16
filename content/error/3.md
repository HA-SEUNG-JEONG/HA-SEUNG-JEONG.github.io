---
emoji: 🔮
title: forEach 오류 해결
date: '2022-08-12 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: 문제해결
---

함수형 코딩 독서 스터디를 하면서 코드 리팩토링을 하던 중에

![](https://velog.velcdn.com/images/gktmd652/post/81bd5a2c-2595-402e-acfd-e9f22bf4ed23/image.png)

forEach에서 오류가 나왔다.

코드 전체를 다 공개할 수는 없지만 `contentChildren`이 배열이 맞는지 확인해보니 아니었다.

그런데 이것을 `forEach` 메소드를 쓰려고 하니까 당연히 안됐다..

처음에는 무지성으로 `split('')` 메소드를 쓰긴 했는데 여전히 동작이 안됐다...

구글링 하다보니 `Array.from()` 이라는 메소드를 이용해서 iterable한 객체를 Array 객체로 만들어줬어야 했다.
