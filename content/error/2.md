---
emoji: 🔮
title: Netlify 배포 오류 해결
date: '2022-05-19 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: 문제해결
---

몇 주 전에 만들어놨던 포트폴리오 웹사이트를 Netlify로 배포하는 과정에서
기존 링크를 `#`로 처리하고 했더니

다음과 같은 오류가 떴다.

> The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md jsx-a11y/anchor-is-valid

Netlify가 #를 인식하지 못하는 모양이다.

그래서 `/`로 바꿔준 후에 다시 배포하니 정상적으로 완료되었다.
