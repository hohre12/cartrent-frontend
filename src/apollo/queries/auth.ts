import { gql } from '@apollo/client';

/**
 * 로그인 뮤테이션
 * - 이메일과 비밀번호를 입력으로 받고, JWT 토큰 및 사용자 정보를 반환합니다.
 */
export const SIGNIN_MUTATION = gql`
  mutation SignIn($signInDto: SignInDto!) {
    signIn(signInDto: $signInDto) {
      accessToken
      refreshToken
    }
  }
`;
