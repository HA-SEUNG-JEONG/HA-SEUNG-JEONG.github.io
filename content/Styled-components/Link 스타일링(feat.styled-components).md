---
emoji: 🔮
title: Link 스타일링(feat.styled-components)
date: '2022-12-18 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: Styled-components
---

```jsx
<Link to="/" style={linkStyle}>
  <h3>프로필</h3>
</Link>
```

링크에 기본적으로 들어가있는 밑줄을 없애기 위해 기존에 만들어뒀던 `linkStyle`을 가져와서 적용할려고 했는데 스타일이 바뀌지 않아서 뭐가 문제인지 살펴봤더니

```js
const SideMenu = styled(Link)`
  //...
`;
```

`Link` 컴포넌트니까 당연히 `Link`를 사용하면 되지라고 했는데 조금 헷갈리는 부분이 있었다.

저렇게 쓸거면 `<Link to='/'></Link>`를 아예 컴포넌트 네이밍으로 바꿔버리는 방법 하나랑

또 다른 방법으로 단순하게 html 태그로 바꿔버리는 것도 있다.

react-router-dom을 오랜만에 쓰다보니 까먹은 부분이 있는데 복습이 필요하다....

## Reference

<a href='https://dev.to/ridhikgovind/how-to-style-your-react-router-links-using-styled-components-2350'>How to style your React-Router links using styled-components
</a>
