const prettierConfig = require('./.prettierrc.cjs');

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,

    node: true,
  },
  extends: [
    // 'react-app',
    'eslint:recommended', // ESLint에서 권장하는 기본 규칙
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended', // Prettier와 ESLint의 충돌을 방지하기 위한 규칙
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser', // TypeScript 코드를 파싱하는데 사용할 파서 지정
  parserOptions: {
    requireConfigFile: false,
    parser: '@typescript-eslint/parser', // TypeScript 코드를 파싱하는데 사용할 파서 지정
    sourceType: 'module', // ECMAScript 모듈 형식으로 코드 작성
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['react-hooks', 'prettier', '@typescript-eslint'],
  ignorePatterns: [
    'node_modules/**',
    './node_modules/**',
    '**/node_modules/**',
    'public/**',
    'dist/**',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useMyCustomHook|useMyOtherCustomHook)',
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    semi: [
      'error',
      'always',
      { omitLastInOneLineBlock: true, omitLastInOneLineClassBody: true },
    ], // 세미콜론 사용
    'import/extensions': 'off', // 파일 확장자를 명시적으로 지정하지 않아도 되도록 함
    'import/prefer-default-export': 'off', // 단일 export가 아니어도 되도록 함
    'import/order': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.APP_ENV === 'production' ? 'error' : 'off', // 프로덕션 환경에서 콘솔 사용 금지
    // 'no-debug': process.env.APP_ENV === 'production' ? 'error' : 'off', // 프로덕션 환경에서 디버그 관련 문제 발생 시 에러
    'prettier/prettier': ['error', prettierConfig],
  },
};
