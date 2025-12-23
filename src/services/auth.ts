import {
  SIGNIN_MUTATION,
  SIGNOUT_MUTATION,
  UPDATE_MY_PASSWORD_MUTATION,
} from '@/apollo/mutations/auth';
import { SignInDto } from '@/types/graphql';
import { useMutation } from '@apollo/client';

export const useSignIn = () => {
  const [signInMutate] = useMutation(SIGNIN_MUTATION);

  const signIn = async (params: SignInDto) => {
    if (!params) return;
    return signInMutate({ variables: { signInDto: params } });
  };
  return { signIn };
};

export const useSignOut = () => {
  const [signOutMutate] = useMutation(SIGNOUT_MUTATION);

  const signOut = async () => {
    return signOutMutate();
  };
  return { signOut };
};

export const useUpdateMyPassword = () => {
  const [updateMyPasswordMutate] = useMutation(UPDATE_MY_PASSWORD_MUTATION);

  const updateMyPassword = async (params: {
    currentPassword: string;
    newPassword: string;
  }) => {
    if (!params) return;
    return updateMyPasswordMutate({
      variables: {
        currentPassword: params.currentPassword,
        newPassword: params.newPassword,
      },
    });
  };
  return { updateMyPassword };
};
