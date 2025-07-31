import { Typography } from '@/themes';
import { FontSize, FontWeight } from '@/types';

export const TYPOGRAPHY_STYLES: Record<FontWeight, object> = {
  light: Typography.light,
  regular: Typography.regular,
  medium: Typography.medium,
  semiBold: Typography.semiBold,
  bold: Typography.bold,
};

export const FONT_SIZE: Record<FontSize, number> = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 20,
};
