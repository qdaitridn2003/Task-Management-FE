module.exports = {
    root: true,
    extends: ['universe/native'],
    plugins: ['prettier'],
    rules: { 'prettier/prettier': ['warn', { endOfLine: 'auto' }] },
};
