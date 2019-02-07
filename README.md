# transformer

JavaScript library that cleans up dirty transit data. This is **not** published on npm.

## Install

This package can be installed as a Node.js dependency by specifying `"@wayline/transformer": "github:cscape/wayline-transformer"` in your package.json file and installing packages as usual.

## Examples

### Utility Methods

```javascript
const transform = require('@wayline/transformer')

const hex = transform.util.colors.hexToRgb('FFFFFF') // => [255, 255, 255]
const json = transform.util.xml2json('<?xml ...') // => { SomeProperty: ... }
```

## License

[MIT](LICENSE) © [Cyberscape](https://cyberscape.co/).
