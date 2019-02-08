# Cleaners

Every folder in this directory and respective file within them is directly
callable when importing the Wayline-Transformer package into another script.

## Explanation

The folder structure as follows

```
── MiamiDadeTransit
      MoverLoops.js
      MoverShape.js
      MoverTracker.js
── TSOMobile
      PubTransNews.js
      PubTransRoutes.js
```

and importing like the following

```javascript
const transform = require('@wayline/transformer')
```

will yield a usable `transform` object containing functions in the same structure as the directories:

```javascript
{
  MiamiDadeTransit: {
    MoverLoops: Function,
    MoverShape: Function,
    MoverTracker: Function
  },
  TSOMobile: {
    PubTransNews: Function,
    PubTransRoutes: Function
  }
}
```
