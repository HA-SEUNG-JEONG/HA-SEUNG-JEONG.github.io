---
emoji: 🔮
title: children 타입에 대하여
date: '2023-02-20 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: 글또
---

타입스크립트로 사이드 프로젝트를 하면서 children 타입을 정해야 하는 일이 생겨

children 타입을 설정해줬었는데 더 살펴보니 다른 타입으로도 설정이 가능하다고 한다.

```tsx
import { ReactNode } from 'react';

export interface ChildrenProps {
  children: JSX.Element | JSX.Element[];
}
```

사실 children 타입을 처음 설정할 당시에는 `JSX.Element`로만 했었는데 JSX 코드가 여러개 올 경우에는 타입이 안 먹히기 때문에 ` JSX.Element | JSX.Element[]` 로 했었다.

## ReactNode

```tsx
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

가장 넓은 타입이며, primitive 타입, fragment 등을 다 받아들인다. 배열 형태가 필요하다면 `ReactNode[]`로 정하면 된다.
다만 `null` 이나 `undefined`가 들어올 경우에는 별도의 타입 검사 및 에러처리가 필요하다.

## ReactElement

```tsx
declare namespace JSX {
  import React = __React;

  interface Element extends React.ReactElement<any> {}
  interface ElementClass extends React.Component<any, any> {
    render(): JSX.Element;
  }
}
```

`JSX.Element`로 표현할 수도 있다.**(완전히 같은 것은 아님)**

하지만, 일반 텍스트 같은 것들은 허용하지 않고 <span style='color:skyblue'>**JSX 요소**</span>만 허용한다.

## ReactChild

`React.Element` 보다는 조금 더 넓은 타입으로

```tsx
type ReactChild = ReactElement<any> | ReactText;
```

되어있으며

`ReactText`는 다음과 같은 타입으로 이루어져있다.

```tsx
type ReactText = string | number;
```

## React.FC

이 타입을 잘 사용하지 않는다고 한다. 그 이유는,

- 제네릭 지원 X,
- children을 암시적으로 허용하기 때문에 children을 허용하지 않고 싶을 때도 전달받을 수 있다.(React 18부터는 사라짐)

라고 하는데, 아직은 크게 와닿지가 않아서 프로젝트를 하면서 더 경험해봐야 알 수 있을 것 같다.

이 타입은 **React 18** 부터 지양하는 추세라고 한다.

이외에도 React.FC, PropsWithChildren이라는 타입도 있다.

React.FC 같은 경우에는 함수 컴포넌트를 작성하면서 종종 쓰곤 했었는데

그 동안에 children 타입을 지정하면서 JSX.Element나 ReactNode를 사용했었는데 더 많은 타입이 있을줄은 몰랐다.

## Reference

https://github.com/coryhouse/react-typescript-starter-kit/blob/master/typings/react/react.d.ts

https://stackoverflow.com/questions/53688899/what-is-the-type-of-the-children-prop

https://handhand.tistory.com/279

https://itchallenger.tistory.com/641

https://github.com/facebook/create-react-app/pull/8177
