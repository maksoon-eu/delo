const stylelintConfig = {
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'config',
          'custom-variant',
          'layer',
          'plugin',
          'source',
          'theme',
          'utility',
          'variant',
        ],
      },
    ],
  },
};

export default stylelintConfig;
