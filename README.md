![BuildStatus](https://circleci.com/gh/ravendyg/-gortrans-client.png?style=shield)

New client app for gortrans.

## Build
```
npm run build      - dev build
npm run build:prod - production build
```
`" -- --env.old"` key would create a build for IE9 (some polyfills provided), without it target would be Chrome 58
