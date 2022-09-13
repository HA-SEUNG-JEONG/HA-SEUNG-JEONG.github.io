---
emoji: 🔮
title: mkcert 오류
date: '2022-09-13 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: 문제해결
---

오늘 코드스테이츠에서 처음으로 백엔드 파트를 들어가게 됐다.

튜토리얼을 보면서 진행하고 있는데 갑자기 이런 게 떴다...

![](https://velog.velcdn.com/images/gktmd652/post/34ccab57-dbc1-43b5-8fe9-5d2ec2329f17/image.png)

<p align='center' style='color:gray'><small>이게뭔데...</small>

먼저 이걸 해결하려면 `mkcert`라는 것을 이용해야 하는데, 나 같이 WSL을 쓰는 경우에는

`chocolatey`라는 것을 또 깔아줘야 했다.

동기분 한명이 윈도우 환경에서 해결하셨다길래 나도 한번 해봐야지 했는데...굉장히 오래 걸렸다..

알고보니까 윈도우랑 우분투 환경 모두 깔아줘야 했다.

일단 문서에 나와있는대로 진행했다. 우선 powershell에서는

```
choco install mkcert
mkcert -install
```

그리고 우분투에서는 `mkcert -install`로 실행한 다음에

다시 vscode로 가서 과제해야지 했는데...아까랑 똑같은 에러(?)가 떴다...

나중에 보니까 서버에서 실행한 로컬호스트 주소가 `http:localhost:4000`이었는데 난 당연히

https겠거니 해서 로그인과 로그아웃 부분에서 axios 요청을 보낼때도 다 https를 붙여줬는데

그래서 안됐던거였다...하..

서버 어렵다...
