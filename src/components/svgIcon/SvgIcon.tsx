import styled from 'styled-components';
import { useDynamicSvgImport } from '../../hooks/useDynamicSvgImport';
import { ComponentProps } from 'react';

interface LazySvgProps extends ComponentProps<'svg'> {
  iconName: string;
  wrapperClass?: string;
  alt?: string;
}

export const SvgIcon = ({
  iconName,
  wrapperClass = '',
  alt,
  ...rest
}: LazySvgProps) => {
  const { loading, SvgIcon: Svg } = useDynamicSvgImport(iconName);

  return (
    <>
      {Svg && (
        <DefaultWraperStyle
          className={[
            `${wrapperClass}`
          ].join(' ')}
        >
          <Svg {...rest} />
        </DefaultWraperStyle>
      )}
      {!loading && !Svg && (
        <img
          src={iconName}
          alt={alt}
        />
      )}
    </>
  );
};

export const DefaultWraperStyle = styled.div`
    display: flex;
    align-items: center;
`
