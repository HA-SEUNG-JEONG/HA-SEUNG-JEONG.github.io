---
emoji: 🔮
title: react-hook-form과 zod 사용하기
date: '2023-06-22 00:00:00'
author: 정하승
tags: 블로그 github-pages gatsby
categories: react-hook-form
---

### zod를 쓴 이유

팀 프로젝트를 하면서 회원가입 폼에 대한 입력값을 실시간으로 검증하는 기능을 구현했었는데 배포하고 나서 확인해 보니 제대로 되지 않았는데 프로젝트도 종료된 마당에 나 혼자 진행할 수도 없어서 개인적으로 아쉬움이 컸다.

그러던 중에 블로그를 통해 `zod`라는 유효성 검증을 쉽게 하는 라이브러리를 보게 되었는데 react-hook-form과도 잘 쓰이고 무엇보다 TypeScript를 위한 라이브러리라고 소개를 해놓아서 아쉬움도 달랠 겸 간단하게 만들어 보기로 했다.

### 스키마 정의

```tsx
import { z } from "zod";

// 스키마 정의
export const schema = z
  .object({
    username: z.string().refine((val) => val.length >= 3 && val.length <= 10, {
      message: "username은 3글자 이상 10글자 이하입니다.",
    }),
    email: z
      .string()
      .min(1, { message: "1글자 이상은 채워주세요." })
      .email({ message: "유효한 이메일을 입력하세요" }),
    password: z
      .string()
      .min(6, "비밀번호는 최소 6글자 이상이어야 합니다.")
      .refine((val) => {
        const strongRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return strongRegex.test(val);
      }, "비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자를 포함해야 합니다."),

    confirmPassword: z
      .string()
      .min(6, { message: "비밀번호 확인란은 필수항목입니다." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

```
username, email, password, password 확인 이렇게 4개의 input 값에 대해 검증하기 위해 스키마를 정의했다. 

### Form 검증

따로 회원가입 서버를 만들어서 하는 등의 코드는 구성하지 않고 클라이언트 측에서 어떻게 검증이 되는지만 알아보았다.

### schema 타입 지정하기

input 값에 대해서

```tsx
interface Props{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
```

위처럼 인터페이스나 타입을 지정해서 만들수도 있지만,

```tsx
z.infer<typeof schema>
```

이렇게 작성하면 `schema`에 대한 타입을 `infer`로 추론하기 때문에 일일이 타입을 지정한 것과 똑같이 타입이 지정된다.

### Form 검증하기

```tsx
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SchemaValues>({
    resolver: zodResolver(schema),
  });
```

`resolver` 속성과 zodResolver 함수를 이용해서 정의한 schema 대로 form 검증이 되도록 한다.

### `mode: 'onChange'` vs `trigger function`

처음에 실시간 검증을 위해 `mode:'onChange'` 라는 속성을 이용하고자 했다. 하지만 입력 필드가 많거나 입력이 자주 변경되면 리 렌더링이 자주 일어나기 때문에 다른 방법을 사용하고자 `trigger`라는 함수를 이용했는데, 이 함수는 특정 필드에 대해서 **수동**으로 유효성 검사를 하며, 해당 필드에 의존하는 컴포넌트가 다시 렌더링 될 수 있다.

### trigger 적용

```tsx
<input
  id="username"
  type="text"
  className="ml-2 my-2 text-xl border-2 border-gray-500"
  {...register("username", {
    pattern: {
      value: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]$/,
      message: "username은 영문,숫자,한글만 입력 가능합니다.",
      },
  })}
  onChange={() => trigger("username")}
/>
```

trigger 함수는 `onChange` 이벤트와 함께 사용할 수 있는데, 무지성으로 아무 위치에다가 작성을 하니,  

>    'onChange'이(가) 두 번 이상 지정되어 이 사용량을 덮어씁니다.

라는 오류가 나왔는데, 

`onChange`를 `register` 호출 전에 등록하면 이 `register`가 email이나 password 필드 등을 등록하기 이전에 `onChange` 이벤트에서 특정 필드를 호출하기 때문에 오류가 나게 되는 것 같다.

따라서 register 호출 이후에 trigger를 호출하면 아무런 문제가 없다.

### 마무리

그런데, `trigger` 방식으로 변경하면서 `onChange` 를 반복적으로 작성해야 해서 이것도 문제가 있다... 역시 모든 것에는 트레이드오프가 있기 마련.

작성하다보니 zod 보다는 react-hook-form의 분량이 좀 많아진 느낌이다... 폼 말고도 다른 곳에서도 쓰이는지 알아봐야겠다.


### Reference
https://www.daleseo.com/zod-why-validation/