import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// validation 체크 custom hook - by재원
const useValidationState = <T>(
  initialState: T | (() => T),
  validMethod?: (text: T) => boolean,
): [T, Dispatch<SetStateAction<T>>, boolean] => {
  const [text, setText] = useState<T>(initialState);
  const [isValid, setValid] = useState<boolean>(false || !validMethod);
  useEffect(() => {
    if (text && validMethod) {
      setValid(validMethod(text));
    }
  }, [text, isValid]);
  return [text, setText, isValid];
};

export default useValidationState;
