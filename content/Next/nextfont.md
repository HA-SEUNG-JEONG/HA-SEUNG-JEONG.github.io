---
emoji: 🔮
title: next/font
date: '2023-01-31 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: Next
---

포트폴리오를 컨펌받다가 폰트를 통일하면 어떻겠냐는 피드백을 받았다.

마침 next로 만들고 있었고, 13버전에 `@next/font`를 지원하고 있어서 한번 적용해보기로 했다.

사용방법은 정말 간단했다.

`pages/_app.tsx`에서 적용하면 되는데 다음과 같이 하면 된다.

```ts
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  subsets: ['vietnamese'],
  weight: ['400', '700'],
  //'100' | '300' | '400' | '500' | '700' | '900' or ['100' , '300' , '400' , '500' , '700' , '900' ] 외 다른 값은 안된다.

  // 타입스크립트의 경우에는 src,weight는 required 속성이며, 나머지는 다 optional이다.
});

return (
  // tailwindcss의 경우 ~~~.className으로 해주면 된다.
  <main className={roboto.className}>
    <Component {...pageProps} />
  </main>
);
```

나는 구글 폰트 중에 `Roboto`라는 것을 사용했는데, @next/font 안에 구글 폰트가 내장되어 있어서 따로 구글에 요청을 보내지 않는다고 한다.

그리고 multiple하게 쓸 수도 있다고 하는데 아직은 그렇게 필요가 있을까..? 싶다.

```tsx
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}

// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      //다음과 같이 fontFamily 적용
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
```

다른 방법으로 `variable` 속성을 사용하여 위와 같이 설정할 수도 있다.

이거 말고 다른 방법도 많은데 나는 주로 TailwindCSS를 써서 다른 CSS 라이브러리를 쓰게 된다면 그 때 써 볼 생각이다.

워낙 문서가 잘 되어있어서...

## Reference

<a href='https://nextjs.org/docs/basic-features/font-optimization'>Optimizing Fonts</a>
