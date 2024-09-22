import { useDynamicSvgImport } from '@/hooks/useDynamicSvgImport';
import { ComponentProps } from 'react';
import style from './SvgIcon.module.scss';

interface LazySvgProps extends ComponentProps<'svg'> {
  iconName: string;
  wrapperClass?: string;
  alt?: string;
}

// Example wrapper component using the hook.
export const SvgIcon = ({
  iconName,
  wrapperClass = '',
  alt,
  ...rest
}: LazySvgProps) => {
  const { loading, error, SvgIcon: Svg } = useDynamicSvgImport(iconName);

  // if (error) {
  //   return 'An error occurred';
  // }

  // if (loading) {
  //   return 'Loading...';
  // }

  // if (!Svg) {
  //   return null
  // }

  return (
    <>
      {/* {loading && (
        <div className="rounded-full bg-slate-400 animate-pulse h-8 w-8"></div>
      )} */}
      {Svg && (
        <div
          className={[
            `${style.defaultWraperStyle ?? ''}`,
            `${wrapperClass}`,
          ].join(' ')}
        >
          <Svg {...rest} />
        </div>
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
