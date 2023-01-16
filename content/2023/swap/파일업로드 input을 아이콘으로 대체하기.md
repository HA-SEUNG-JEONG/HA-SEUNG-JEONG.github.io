---
emoji: 🔮
title: 파일업로드 input을 아이콘으로 대체하기
date: '2023-01-04 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: swap
---

<img src='../../assets/swap.png' />
<br/>

그림처럼 plus 아이콘을 클릭하면 파일을 업로드 할 수 있게 만드는 작업을 진행했었다.

```jsx
<label htmlFor="file-input">
    <AiOutlinePlusCircle className="plus" onClick={handleIconClick} />
</label>
<input type="file" />
```

처음에는 이렇게 코드를 짰더니 너무 예쁘지 않는 파일 업로드 버튼이 나오길래, 더 찾아보니

```jsx
<input id="file-input" type="file" />
```

이렇게 `label`에 있는 `htmlFor` 속성과 매칭되는 `id`를 부여해야 했다.

htmlFor과 input의 id 속성을 연결해줘야 하는 게 기본적인 스펙으로 제공되고 있었다.

잘 알아둬야지..

### Reference

https://stackoverflow.com/questions/2855589/replace-input-type-file-by-an-image
https://developer.mozilla.org/ko/docs/Web/HTML/Element/label
