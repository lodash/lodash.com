const { createStitches } = require('@stitches/react');

const { styled, css, getCssText } = createStitches({
  tokens: {
    fonts: {
      system: 'system-ui',
    },
    colors: {
      hiContrast: 'hsl(206,10%,5%)',
      loContrast: 'white',
    },
    fontSizes: {
      1: '13px',
      2: '15px',
      3: '17px',
    },
  },
});

module.exports = { styled, css, getCssText }