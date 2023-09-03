import { blue, slate, slateA, slateDark, teal, violet } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  theme: {
    colors: {
      textLowContrast: slate.slate11,
      textHighContrast: slate.slate12,
      appBackground: slateA.slateA1,
      slateBackground: slateA.slateA2,
      subtleBorder: slateA.slateA6,

      elementBackground: slateDark.slate3,
      elementBackgroundHover: slateDark.slate4,
      elementBackgroundActive: slateDark.slate5,
    },

    // fonts: {
    //   system: 'system-ui',
    // },
    // fontSizes: {
    //   1: '13px',
    //   2: '15px',
    //   3: '17px',
    // },
  },
});

export const darkTheme = createTheme({
  colors: {
    textLowContrast: slateDark.slate11,
    textHighContrast: slateDark.slate12,
    appBackground: slateDark.slate1,
    slateBackground: slateDark.slate2,
    subtleBorder: slateDark.slate6,

    elementBackground: slateDark.slate3,
    elementBackgroundHover: slateDark.slate4,
    elementBackgroundActive: slateDark.slate5,
  },
});

globalCss({
  body: {
    // we can call the color token values with the
    // $ prefix in a string
    backgroundColor: '$appBackground',
    // color: '$textLowContrast',
  },
})();

// GlobalStyles();
