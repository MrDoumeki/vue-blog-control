module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      },
      'whatever'
    ],
    [
      'import',
      {libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: 'css'
      }
    ]
  ]
}
