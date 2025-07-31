/**
 * Declare svg module type to use inline svg import, for example:
 * `import Plus from './plus.svg'`
 * <Plus />
 */
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}
