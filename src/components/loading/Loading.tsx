import styled, { keyframes } from 'styled-components';

type LoadingProps = {
  message?: string;
  size?: 'small' | 'medium' | 'large';
};

const Loading = ({
  message = '데이터를 불러오는 중...',
  size = 'medium',
}: LoadingProps) => {
  return (
    <LoadingWrapper>
      <Spinner $size={size} />
      {message && <LoadingText>{message}</LoadingText>}
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 100%;
  min-height: 300px;
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ $size: string }>`
  ${({ $size }) => {
    if ($size === 'small') return 'width: 32px; height: 32px; border-width: 3px;';
    if ($size === 'large')
      return 'width: 64px; height: 64px; border-width: 6px;';
    return 'width: 48px; height: 48px; border-width: 5px;'; // medium
  }}

  border: 5px solid #eee;
  border-bottom-color: #2abeba;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

const LoadingText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #666;
  margin: 0;
`;
