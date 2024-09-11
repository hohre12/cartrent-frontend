# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

---

## A. type 명명 Guide

> ### list > detail > post | put | delete

- **1.** list의 경우

  ```
    - [domain]ListRequest
    - [domain]ListResponse
    - [domain]List
  ```

- **2.** detail의 경우

  ```
    - [domain]Request
    - [domain]Response
    - [domain]
  ```

- **3.** post의 경우

  ```
    - detail의 [domain]을 extends 가능한 경우 extends & [domain] || PostRequest
    - [domain]PostResponse
    - extends detail의 [domain] || [domain]Post
  ```

- **4.** put의 경우

  ```
    - detail의 [domain]을 extends 가능한 경우 extends & [domain] || PutRequest
    - [domain]PutResponse
    - extends detail의 [domain] || [domain]Put
  ```

- **5.** delete의 경우

  ```
    - [domain]DeleteRequest
    - [domain]DeleteResponse
    - extends detail의 [domain] || [domain]Delete
  ```

- **6.** front handle type인 경우

  ```
    - /* front handle type */ 주석 추가
  ```

---

## B. service 작성 Guide

---

## C. about styles

> ### extentions

vscode-styled-components([link](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components))
