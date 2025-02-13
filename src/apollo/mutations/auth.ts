import { gql } from '@apollo/client';
/* Mutation */
/**
 * 로그인 뮤테이션
 * - 이메일과 비밀번호를 입력으로 받고, JWT 토큰 및 사용자 정보를 반환합니다.
 */
export const SIGNIN_MUTATION = gql`
  mutation SignIn($signInDto: SignInDto!) {
    signIn(signInDto: $signInDto) {
      accessToken
      refreshToken
      user {
        name
        id
      }
    }
  }
`;
export const SIGNUP_MUTATION = gql`
  mutation SignUp($signUpDto: SignUpDto!) {
    signUp(signUpDto: $signUpDto) {
      created_at
      deleted_at
      email
      id
      name
      password
      updated_at
    }
  }
`;
export const SIGNOUT_MUTATION = gql`
  mutation Mutation {
    signOut
  }
`;
export const REFRESH_MUTATION = gql`
  mutation Refresh($refreshToken: String!) {
    refresh(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      user {
        id
        name
      }
    }
  }
`;
export const UPDATE_MY_INFO_MUTATION = gql`
  mutation UpdateMyInfo($updateUserDto: UpdateUserDto!) {
    updateMyInfo(updateUserDto: $updateUserDto) {
      user {
        name
        id
      }
    }
  }
`;
export const CREATE_CITY_MUTATION = gql`
  mutation CreateCity($createCityDto: CreateCityDto!) {
    createCity(createCityDto: $createCityDto) {
      id
      name
    }
  }
`;
export const UPDATE_CITY_MUTATION = gql`
  mutation UpdateCity($updateCityDto: UpdateCityDto!) {
    updateCity(updateCityDto: $updateCityDto) {
      id
      name
    }
  }
`;
export const DELETE_CITY_MUTATION = gql`
  mutation DeleteCity($cityId: Float!) {
    deleteCity(cityId: $cityId)
  }
`;
/* Mutation */
