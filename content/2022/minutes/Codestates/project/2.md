---
emoji: 🔮
title: Pre 프로젝트 종료
date: '2022-11-07 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: 프로젝트
---

### 협업 시작

StackOverflow 사이트를 구현하기 이전에 다같이 칸반과 마일스톤을 제작했다.

노션으로만 해봤었는데 깃허브로도 꽤 구체적으로 할 수 있었다.

그리고, 사이트를 참조하면서 화면 정의서,API 명세서를 1차적으로 만들었다.

### API 명세서

프론트 팀원들끼리 어떤 API로 어떤 데이터를 받아와서 화면에 뿌릴 지 결정해야 했다.

API는 https://api.stackexchange.com/docs
를 참조했는데 이걸 보면서 일일이 뺄 부분은 빼면서 진행하다 보니 시간이 너무 오래 걸렸다.

### 백엔드와 통신 테스트

내가 진행하지는 않았지만 ngrok 테스트도 무사히 완료됐다.

### eslint의 잔소리...

처음 세팅을 잘못 해서 그런지 컴포넌트 작업을 들어가면서 git 충돌이 좀 많이 일어났다.

tailwindcss eslint에 대해서는 전혀 몰랐었는데

```js
	rules: {
		'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
		'tailwindcss/classnames-order': 'warn',
		'tailwindcss/enforces-negative-arbitrary-values': 'warn',
		'tailwindcss/enforces-shorthand': 'warn',
		'tailwindcss/migration-from-tailwind-2': 'warn',
		'tailwindcss/no-arbitrary-value': 'off',
		'tailwindcss/no-custom-classname': 'warn',
		'tailwindcss/no-contradicting-classname': 'error',
	},
```

이런식으로 적용이 가능했었다.

여담이지만 `footer` 같은 경우 이거를 바닥에다 고정시키고 싶을 때 `bottom-0 left-0 right-0 top-0`로 썼었는데

`inset-0`으로 쓰라고 친절하게 warning으로 알려줘서 이번에 또 배우게 됐다.

### Merge 실수

팀원끼리 모여서 merge를 하는 시간(?)을 가졌는데 실수로 `dev`가 아닌 `main`에 해버린 것이었다...

화면 공유를 하면서 진행했는데 다행히 revert를 써서 어찌 해결은 할 수 있었다..

merge 브랜치를 `dev`로 변경하는 방법도 생각했었지만 그렇게 되면 백엔드 분들에게 혼란을 줄 거 같아서
그냥 함께 제대로 보기로 했다.

### 태그 구현

질문 작성 페이지에서 태그 구현을 어떻게 할 지 엄청 막막했는데

유어클래스에서 배운 부분이 기억이 나서 너무 시간을 오래 끌진 않았다.

<img src='../../../assets/화면 캡처 2022-11-07 163927.png' />

### react-hook-form

유어클래스 말고 내가 개인적으로 배워본 거 적용해보겠다고 쓴 라이브러리인데 제대로 적용을 못했다...

그냥 useState로 해결했다.

### CORS 에러

`get` 요청은 별 탈 없이 잘 받아와지지만 `post`,`patch`는 아무리 `http-proxy-middleware`를 써도 해결이 안되서 거의 이틀동안 이 오류만 해결했던 거 같은데, 알고 보니 `http-proxy-middleware`를 쓰면 같은 로컬에서만 해당이 된다.

하지만 당시 상황에서는 아예 다른 호스트 주소랑 통신해야 했기 때문에 위 방법이 안 먹혔던 것이다.

https://cors-anywhere.herokuapp.com/corsdemo 를 이용하면 다른 호스팅 주소라도 오류없이 가능하다고 해서 적용해봤더니 바로 해결...

<img src='../../../assets/image.png' />

### 배포

처음에 `vercel`로 배포해보고자 했는데 EC2랑 연동하는 방법을 구글링 해봐도 잘 안나와서 결국은 프론트,백 모두 EC2로 배포하기로 했다.

프리 프로젝트 끝나기 이틀 전인가 그때 배포 성공적으로 마무리 했는데...

배포 마감기한 당일에도 자잘한 문제가 발생해서 마지막까지도 고쳤다.

vercel로 배포한 팀도 있었는데 나중에 물어봐야겠다.

### 좋았던 점

- 내가 제안한 라이브러리 적용
- 혼자 했으면 절대 하지 않았을 칸반, 마일스톤 제작
- `react query`를 좀 더 이해할 수 있게 됐다.

### 아쉬웠던 점

- Recoil을 사용하면서 로그인 부분에서 계속 오류가 났었는데 결국 `localStorage`만을 이용해서 구현했다.
- vercel로 배포 못한 것
- 프론트 팀원 모두 타입스크립트에 익숙하지 않고 기간도 2주로 짧다보니 적용을 못한 것

### 마무리

2주 동안 클론 코딩이었지만 팀원 모두가 고생했다.

그 동안 리액트를 위주로 공부하면서 개발을 했었는데 이번에 프리 프로젝트를 진행하면서 백엔드의 상황을 조금이나마 이해할 수 있었던 것 같고

협업하면서 좀 싸우지(?) 않을까 걱정했었는데 정말 둥글둥글하게 마무리했다.

메인 프로젝트도 똑같이 잘 마무리하면 좋겠다.
