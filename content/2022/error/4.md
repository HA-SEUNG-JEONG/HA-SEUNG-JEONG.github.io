---
emoji: 🔮
title: github default branch 변경 오류
date: '2022-08-26 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: 문제해결
---

master로 되어있던 브랜치를 main으로 변경하기 위해

`git branch -m master main` 로 적용할려 그랬는데 안되길래 현재 있는 브랜치가 잘못됐나...? 싶었다.

알고보니 `git add`로 스테이지에 올리고 나서 default 브랜치를 바꾸려고 하니까 문제가 생긴 것 같다.

커밋을 올린 후에 다시 명령어를 치니 잘 됐다.
