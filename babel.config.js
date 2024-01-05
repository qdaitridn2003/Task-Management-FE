module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src', './node_modules'],
        },
      ],
      'nativewind/babel',
      '@babel/transform-react-jsx-source',
      'react-native-reanimated/plugin',
    ],
  };
};
