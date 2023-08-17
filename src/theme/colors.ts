// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  primary: '#F9AD37',
  textColor: '#3F3F3F',
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  black: '#000000',
  gray: '#B2B2B2',
  white: '#FFFFFF',
  /**
   * The default text color in many components.
   */
};
