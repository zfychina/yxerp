module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],

  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic",
        "importSource": "@antv/f2"
      }
    ]
  ]


}
