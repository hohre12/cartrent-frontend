export const validEmpty = (value: string) => {
  if (!value) return false;
  return true;
};

export const validPassword = (password: string) => {
  return true;
  // let validatePattern =
  //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
  // // 입력 형식이 문자 / 특수문자 / 숫자로 이루어지지 않았을 경우 : 영문 / 숫자 / 특수 문자를 모두 포함하여 8~20자 길이로 입력해주세요.
  // // 입력 x or 8자리 미만 or 20자리 초과 : 영문 / 숫자 / 특수 문자를 모두 포함하여 8~20자 길이로 입력해주세요.
  // if (validatePattern.test(password)) return true;
  // else return false;
};
