---
emoji: 🔮
title: validatedomnesting(...) button cannot appear as a descendant of button 오류 해결
date: '2022-06-26 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: 문제해결
---

카카오 공유 버튼을 만들면서 다음과 같은 오류를 만나게 되었다.

![](https://velog.velcdn.com/images/gktmd652/post/51b30bd6-c621-41ae-bb3d-3d15c4829ba8/image.png)

https://github.com/aichbauer/styled-bootstrap-components/issues/29

<div align='center'>
<img src="https://velog.velcdn.com/images/gktmd652/post/234b1e34-3506-4c2f-8830-9a49b83bff11/image.png"/>
<small align='center'>역시 오류는 찾으면 바로 나온다...</small>
</div>

카카오 공유 버튼으로 `button` 컴포넌트를 만들었는데 이를 이용하기 위해 또 다시 `button` 태그를 이용해서 문제가 발생한 것이었다.

```ts
const Button = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  justify-content: center;
  margin: 0 auto;
`;

const Artwork = () => {
  return (
    <div>
      <Container>Artwork</Container>
      <Button>
        <KaKaoShareButton />
      </Button>
    </div>
  );
};
```

`div` 태그로 바꿔주니 말끔하게 해결되었다.
