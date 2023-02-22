---
emoji: 🔮
title: SWR에 관하여
date: '2022-10-14 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: React
---

### stale-while-revalidate가 무엇인가?

일단 문서에 따르면 `HTTP 캐시 무효화 전략`이라고는 한다..

stale-while-revalidate을 검색해보니 `Cache-control`에 관한 내용이 나왔고,

```html
Cache-Control: max-age=<seconds>, stale-while-revalidate=<seconds></seconds></seconds>
```

어차피 알고 싶은 거는 stale-while-revalidate이기 때문에 이에 관한 설명을 좀 봤다.

```
In the example above, the response is fresh for 7 days (604800s). After 7 days it becomes stale, but the cache is allowed to reuse it for any requests that are made in the following day (86400s), provided that they revalidate the response in the background.

Revalidation will make the cache be fresh again, so it appears to clients that it was always fresh during that period — effectively hiding the latency penalty of revalidation from them.

If no request happened during that period, the cache became stale and the next request will revalidate normally.
```

요약해보자면 `stale-while-revalidate`는 결국 캐싱된 값을 반환하는 동시에 revalidation을 진행하는 메커니즘인 것 같다.

더 찾아보다가 `Stale response`와 `revalidate response`에 관한 설명이 나왔는데

> **Revalidate response**
> Ask the origin server whether or not the stored response is still fresh. Usually, the revalidation is done through a conditional request.

> **Stale response**
> Indicates that the response is a stale response. This usually means the response can't be reused as-is. Cache storage isn't required to remove stale responses immediately because revalidation could change the response from being stale to being fresh again.

내 나름대로 해석을 해보자면..

Revalidate Response는 origin 서버에 저장된 응답이 아직 최신인지 여부를 묻고, 보통 revalidation은 조건부 요청을 통해 완료된디.

Stale Response는 이미 낡은(?) 응답을 나타내는데 보통은 이걸 재사용할 수는 없다. cache storage는 오래된 응답을 즉시 제거할 필요가 없고 revalidation을 통해 응답이 오래된 것에서 다시 최신으로 바뀔 수 있기 때문이다.

~~솔직히 무슨 소린지는 확실히 모르겠다..~~

#### Cache storage는 또 뭔가...

Cache란 특정한 데이터를 저장하는 임시 저장소로서 후에 재요청 할 일이 있을때 origin 서버를 거치는게 아니라 cache를 거치게 되는 것이다.

참고자료:
https://datatracker.ietf.org/doc/html/rfc5861#section-3
https://fetch.spec.whatwg.org/#concept-stale-while-revalidate-response
https://youthfulhps.dev/web/stale-while-ravalidate/
https://jbee.io/react/thinking-about-global-state/
https://tools.ietf.org/html/rfc5861
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
https://somedaycode.github.io/develop/2021/03/12/cacheStorage/

### Server State vs UI State

Server State

- 말 그대로 서버에서 관리하고 있는 데이터
  => 배달앱에서 주문한 주문자 정보 및 주문 메뉴 등
- 클라이언트에서 axios나 fetch 등의 요청을 통해 서버로부터 받아오는 데이터
- 데이터가 언제 어느 시점에 바뀔 지 알 수 없다.

UI State

- 다크모드,라이트모드 같은 theme, 폼에 입력된 데이터, 언어 등
- 동기적으로 상태를 가짐(`useState`는 경우가 다를지도...?)

!codesandbox[muddy-feather-xr52dh?fontsize=14&hidenavigation=1&theme=dark]

보통 Server state는 `Tanstack Query`나 `SWR`을 주로 사용하고, UI 쪽은 `Redux`나 `Recoil` 등의 라이브러리를 주로 사용하는 추세인 듯하다.

또한 UI State는 Local쪽과 Global로 나뉜다.

모달이나 폼 입력 데이터, 현재 활성화된 nav link 등은 Local
언어나 인증된 유저,theme 등은 전역적으로 관리되기 때문에 Global이다.

참고자료 : https://bobbyhadz.com/blog/react-state-types

### getServerSideProps 👉 SWR로 리팩토링

```tsx
export async function getStaticProps() {
  // const blogPosts = getPosts;
  const { data, error, isValidating } = useSWR('./api/getPosts');
  console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}

export default blog;
```

```ts
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';

export const getPosts = readdirSync('./__posts').map((file) => {
  const content = readFileSync(`./__posts/${file}`, 'utf-8');
  return JSON.parse(JSON.stringify(matter(content).data));
});
```

![](https://velog.velcdn.com/images/gktmd652/post/abef0d12-615a-41c0-ac89-de3baeea9fae/image.png)

짠 오류 발생

서버 쪽에서 돌아가는 함수 안에 SWR을 작성해서 그런가..? 싶어서 터미널을 보니

`Warning: Invalid hook call. Hooks can only be called inside of the body of a function component.`

hook을 잘못 호출했단다...

![](https://velog.velcdn.com/images/gktmd652/post/93cc8726-ba82-4984-9de1-055632abdbc7/image.png)

위치를 옮겨봤는데 데이터가 안나온다...

아직 nextjs를 그렇게 많이 공부해본 건 아닌지라 Data Fetching에 관련된 함수라던지 이런것들이 익숙하지는 않아서 좀 힘들다...

next 공부해가면서 블로그 다시 만들기 시작하면 그 때는 정말 SWR 적용해봐야지.
