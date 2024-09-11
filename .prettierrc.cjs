const prettierConfig = {
    singleQuote: true, // 작은따옴표 사용
    semi: true, // 세미콜론 사용
    tabWidth: 2, // 탭의 너비
    printWidth: 80, // 한 줄의 최대 길이
    bracketSpacing: true, // 객체 리터럴의 괄호 사이에 공백 사용
    arrowParens: 'always', // 화살표 함수의 매개변수 괄호 사용
    endOfLine: 'auto', // 플랫폼에 맞게 개행문자 설정
    htmlWhitespaceSensitivity: 'ignore',
    singleAttributePerLine: true,
  };
  
  module.exports = prettierConfig;
  