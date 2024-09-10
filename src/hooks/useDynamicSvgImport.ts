import { ComponentProps, FC, useEffect, useRef, useState } from 'react';

export const useDynamicSvgImport = (name: string) => {
  const importRef = useRef<FC<ComponentProps<'svg'>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        importRef.current = (
          await import(`@/assets/svgs/${name}.svg?react`)
        ).default;
      } catch (err) {
        setError(err as Error);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  return {
    error,
    loading,
    SvgIcon: importRef.current,
  };
};
