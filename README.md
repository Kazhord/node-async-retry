# @kazhord/node-async-retry

Retry a function multiple times if it fails. 

## Installation
```sh
$ npm install @kazhord/node-async-retry
```

## Features
Usable in two ways :
- Until max retries is reached
- Until a condition is true

## To do
- Add more tests
- Add comments

## API
```js
import { retry } from '@kazhord/node-async-retry'
```

### Retry N times
```js
await retry(
    async () => {
      return 'test'
    },
    {
      retries: 3
    }
)
/*
'test'
*/
```

### Retry N times waiting T ms between each retry
```js
await retry(
    async () => {
      return 'test'
    },
    {
      retries: 3,
      delay: 1000,
    }
)
/*
'test'
*/
```

### Retry un condition is true
```js
await retry(
    async () => {
      return 'test'
    },
    {
      until: (e) => {
        return true
      }
    }
)
/*
'test'
*/
```

### Retry un condition is true waiting T ms between each retry
```js
await retry(
    async () => {
      return 'test'
    },
    {
      delay: 1000,
      until: (e) => {
        return true
      }
    }
)
/*
'test'
*/
```