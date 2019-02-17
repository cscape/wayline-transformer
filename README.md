# transformer

JavaScript library that cleans up dirty transit data. This is **not** published on npm.

## Install

This package can be installed as a Node.js dependency by specifying `@wayline/transformer` in your package.json file and installing packages as usual.

```json
{
  "dependencies": {
    "@wayline/transformer": "github:cscape/wayline-transformer"
  }
}
```

## Development

If adding new APIs or changing folder/file structure, run the build command with `npm run build` or `node build.js` to generate a new module.js export.

## Examples

### Data Transformers/Normalizers

Sample code for all transformer methods is located in the [`tests/`](tests) folder

### Utility Methods

```javascript
const transform = require('@wayline/transformer')

const hex = transform.util.colors.hexToRgb('FFFFFF') // => [255, 255, 255]
const json = transform.util.xml2json('<?xml ...') // => { SomeProperty: ... }
```

## License

[MIT](LICENSE) © [Cyberscape](https://cyberscape.co/).
