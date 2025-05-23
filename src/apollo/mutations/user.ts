import { gql } from '@apollo/client';

/* Mutation */
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserDto: CreateUserDto!) {
    createUser(createUserDto: $createUserDto) {
      id
    }
  }
`;
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserDto: UpdateUserDto!) {
    updateUser(updateUserDto: $updateUserDto) {
      id
    }
  }
`;
export const UPDATE_USER_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($updatePasswordDto: UpdatePasswordDto!) {
    updatePassword(updatePasswordDto: $updatePasswordDto)
  }
`;
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: Float!, $targetUserId: Float) {
    deleteUser(deleteUserId: $deleteUserId, targetUserId: $targetUserId)
  }
`;
/* Mutation */
