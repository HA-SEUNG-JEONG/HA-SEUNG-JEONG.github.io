---
emoji: 🔮
title: Next.js로 마크다운으로 작성한 블로그를 정적 페이지(SSG)로 배포하기
date: '2022-10-10 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: nextjs
---

**1) ** **:: 폴더 구조 및 라우팅**

- 사용자는 루트 경로의 `__posts` 폴더에 작성된 마크다운 파일(`.md`)를 작성할 수 있어야 합니다. 해당 파일은 마크다운 본문과 게시물에 대한 meta data를 담을 수 있어야 합니다. 아래는 마크다운에 jekyll에서 만든 `frontmatter`라는 문법([링크](https://jekyllrb.com/docs/front-matter/))을 적용한 예시입니다.

![](https://velog.velcdn.com/images/gktmd652/post/499abff5-df52-4d47-a134-99c6b8e67b5b/image.png)

처음에는 폴더명을 posts로 했었는데 과제 설명을 다시 보니 `__post`로 나와있었다.

폴더명이 크게 상관이 있겠냐만은... 저렇게 언더바로 되어있는 걸 처음 봤다.

**2)** - 블로그에 작성된 게시물을 렌더링하는 `목록 페이지`와 개별 게시물을 렌더링하는 `상세 페이지`로 나누어 작성해주세요. - `/` - 목록 페이지 - `/[id]` - 상세 페이지

### getStaticProps

정적 페이지 렌더링을 하기 위해 `getStaticProps` 함수를 사용하고

```tsx
// root(/) 페이지 만들기
interface Post {
  categories: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
}

const blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      {posts.map((post, id) => (
        <div key={id} className="mb-5">
          <span className="text-lg text-red-500">{post.categories}</span>
          <div>
            <span>
              {post.date} / {post.tags}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync('./posts').map((file) => {
    const content = readFileSync(`./posts/${file}`, 'utf-8');
    return matter(content).data;
  });

  return {
    props: {
      posts: blogPosts,
    },
  };
}
```

`fs` 모듈의 `readdirSync`를 이용해서 `/posts` 폴더 내에 있는 모든 파일을 읽어온 다음 `readFileSync`로 담긴 정적 파일들을 utf-8로 처리한다.

그리고 `matter(content)`를 콘솔로 찍어보면 다음과 같이 나온다.

![](https://velog.velcdn.com/images/gktmd652/post/b039bce3-8832-4511-8d0e-4bf8cc9ca047/image.png)

앞서 gray-matter를 설치해서 content를 matter 함수로 감쌌는데 지금 상황에서는 data가 필요하기 때문에 `matter(content).data`로 처리한다.

주의할 점은 return을 할 때 `props` 키로 가진 객체가 반드시 존재해야 한다는 것이다.(**빈 객체**여도 오류는 안난다.)

`Aborted because ./pages/blog/index.tsx is not accepted`
-> vscode 터미널에서 갑자기 이런게 나왔는데 ~~이건 뭐임...~~ 찾아보니까 webpack 버그인거 같은데...확실하지는 않다.

![](https://velog.velcdn.com/images/gktmd652/post/2590f112-47a7-4469-aea2-9b560a43ca36/image.png)

에러 메시지도 꽤 친절하게 알려준다.

### getStaticPaths

> If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.

> When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.

<small><p align='center'>Next.js 공식문서</p></small>

동적 페이지에 대한 URL을 렌더링할 때 쓰는 함수로, `getStaticProps`을 사용할 때 필요하다. 그리고 Next.js는 getStaticPaths에서 지정한 모든 경로를 정적으로 pre-rendering한다고 한다.

```tsx
export function getStaticPaths() {
  const files = readdirSync('./__posts').map((file) => {
    const [name, _] = file.split('.');
    return { params: { slug: name } };
  });
  return {
    //paths와 fallback은 반드시 필요 -> 이 부분은 더 찾아봐야 할듯
    paths: files,
    fallback: false,
  };
}
```

`getStaticProps` 와 비슷한 맥락으로, return 할 때 `paths`, `fallback`을 제공해주지 않으면 에러가 난다.

![](https://velog.velcdn.com/images/gktmd652/post/0d971701-462a-4d31-8f65-e483e2e0be64/image.png)

공식문서에 따르면

```tsx
export async function getStaticPaths() {
  return {
    paths: Array<string | { params: { [key: string]: string } }>,
    fallback: boolean
  }
}
```

이런 모양으로 하라고 권장하는데 params와 fallback에 관한 설명은 다음과 같다.

> `paths` : this property is an Array of URLs ("paths") that should be statically generated at build-time. The returned paths must match the dynamic route shape.

빌드 시에 정적으로 생성되어야 하는 URL 경로로서 리턴된 경로는 항상 일치해야 한다.

```tsx
// pages/blog/[slug].js
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/blog/first-post',
      // Object variant:
      { params: { slug: 'second-post' } },
    ],
    fallback: true,
  };
}
```

> `fallback`: this property can be a Boolean, specifying whether or not a fallback version of this page should be generated, or a string 'blocking' to wait for the generation:

fallback 부분은 오늘 사이드 회의가 끝나면 더 읽어봐야 할 것 같다...

```tsx
// pages/blog/[slug].tsx

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { content, data } = matter.read(`./__posts/${ctx.params?.slug}.md`);
  const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);
  return {
    props: {
      data,
      post: value,
    },
  };
};
```

`matter.read`를 이용하여 `__posts` 경로 내에 있는 .md 파일을 읽어오면

```
## 예시입니다 ->content

- 예시 2입니다.


 { ->data
  id: 2,
  categories: [ 'Development', 'VIM', 'Coding' ],
  date: '2022-04-06',
  description: '코딩 조와',
  slug: 'spf13-vim-3-0-release-and-new-website',
  tags: [ '.vimrc', 'plugins', 'spf13-vim', 'vim', 'vscode' ],
  title: 'hi'
}
```

위와 같이 나오는데

content를 가공(?) 하기 위해 unified 깃헙 문서를 이용해서

```tsx
const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);
```

결과

```html
<h2>예시입니다</h2>
<ul>
  <li>예시 2입니다.</li>
</ul>
```

근데 만약에 이 html 파일을 (getStaticProps 함수를 이용) return 해서 그대로 페이지에 뿌리게 되면 XSS 공격에 취약해질 수 있기 때문에 `dangerouslySetInnerHTML`을 사용한다.

```tsx
const Post: NextPage<{ post: string }> = ({ post }) => {
  return <section className="blog-post-content" dangerouslySetInnerHTML={{ __html: post }} />;
};
```

```tsx
    interface DOMAttributes<T> {
        children?: ReactNode | undefined;
        dangerouslySetInnerHTML?: {
            __html: string;
        } | undefined;
```

역시 까보면 나온다.

이제 netlify로 배포만 하면 된다하고 배포를 진행했는데...

![](https://velog.velcdn.com/images/gktmd652/post/0cd0b139-f4da-4a64-a2f9-0a72b4705d69/image.png)

Error남..

구글링을 막해서 찾아본 결과 `yarn.lock`,`node_modules` 삭제했는데... 그래도 안됨 ㅎ

캐시도 삭제해보고 했는데도 똑같길래 코드가 잘못됐나 싶어 다시 보니,

![](https://velog.velcdn.com/images/gktmd652/post/f1f700e3-cc05-4d0e-bf8d-90efa98801ae/image.png)

이렇게 고쳐주니 정상적으로 deploy가 됐다.

![](https://velog.velcdn.com/images/gktmd652/post/1dfe20e3-44ec-44c5-9724-ff12b4dcd813/image.png)

사실 nextjs로 배포는 이번이 처음이었다...

폴더명 이름이 문제였나 싶기도 하고,,, 다음에 배포할 일이 있으면 그 때 정신 똑띠 차려야지.

### 느낀 점

이번에 과제를 하면서 마크다운 파일을 Next.js를 이용해서 pre-rendering도 가능하고 동적으로 렌더링이 가능하다는 것도 알았다. 무엇보다 마크다운 파일을 변환하는 과정이 맘에 들었고 지금은 갯츠비 템플릿을 이용해서 따로 블로그가 있는데
Next로도 한번 내 손으로 만들어봐야겠다.

### 참고자료

- https://reactjs.org/docs/dom-elements.html
- 노마드코더
- Next.js 공식문서
