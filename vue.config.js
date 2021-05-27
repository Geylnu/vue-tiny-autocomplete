module.exports = {
  css: {
    extract: false,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/variables.scss";`,
      },
    },
  },
};
