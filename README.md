# esm-rollup-combo 🙌🗞

Just ESM.js + Rollup.js FTW!!! 🙌 ლ(ಠ益ಠ)ლ 

# Summary
This NodeJS repository demonstrates the usage of **ONLY**:
- 🙌 [ESM (ES Module Loader alternative to 'node --experimental-modules')](https://github.com/standard-things/esm)
- 🗞 [RollupJS (a damn better bundler than Webpack!!!!)](https://rollupjs.org)

And you definitely **DON'T NEED** the following for pure NodeJS apps:
- ❌ BABEL!!! 😑👎
- ❌ WEBPACK!!! 😑👎


# Background
So at the time of writing this (19 Dec 2018) NodeJS LTS was v10.14.2 which means ECMAScript 6 **should** just work right out of the box (we're talking 'import' and all ES6 goodness). So why the hell is it so difficult to get running? ლ(ಠ益ಠ)ლ 

## 🤔 What about 'node --experimental-modules *.mjs'?
This works, except at the time of trying there was issues using [Jestjs Testing](https://jestjs.io/) which didn't acknowledge the *.mjs file extension and the hacks were horrendous which lead to a hunt for a sensible toolchain.
So ended up reverting to a combination of:
- [Mocha](https://mochajs.org/)
- [Chai (using Expect)](https://www.chaijs.com/)
- [Sinon test spies](https://sinonjs.org/)
- [Moxios - Axios Mocks](https://github.com/axios/moxios)

**!!!Yes this rant is all about getting testing to work!!!**

**!!!❌NO TESTS - ❌NO STRAIGHT TO PRODUCTION #s2p!!!**

## 🤔 What happened to Babel & Webpack?

Definitely both useful tools for bundling frontend code and would spend the extra time to get it running (but DAMN are those tools FIDDLY!).
Even after removing Jest & setting up Webpack 4 for bundling, there were issues with resultant app.bundle.js acknowledging the NODE_ENV with this project ('mode':'production' was set etc...), so not a smooth development experience.

However, for pure backend NodeJS apps with no frontend, those tools are not necessary when writing code in ES6. Instead we're going with the bare minimum, [ESM](https://github.com/standard-things/esm) & [Rollup to bundle up our app](https://rollupjs.org)

### ⚙️ Development Strategy - use ESM
[ESM](https://github.com/standard-things/esm)
```
npm install --save esm
```

package.json
```
  "scripts": {
    "develop": "node -r esm src/index.js",
```

### ⚙️ Production Strategy - use RollupJS to bundle
[RollupJS (a damn better bundler than Webpack!!!!)](https://rollupjs.org)
```
npm install --save-dev rollup rollup-plugin-node-resolve
```

package.json
```
"scripts": {
    "build": "rollup --config rollup.config.prod.js"
```

rollup.config.production.js
```
import resolve from "rollup-plugin-node-resolve";

export default {
    input: './src/index.js',
    output: [
        {
            file: './dist/app.bundle.js',
            format: 'cjs',
            sourceMap: true
        }
    ],
    plugins: [
        resolve({
            module: true,
            modulesOnly: true
        })
    ]
}
```

## 🤔 Could you use Rollup Develop builds instead of ESM?
Most definitely, just create a rollup.config.dev.js and have a filewatcher for continuous develop builds.
I like ESM, it's quick and it works well 🙌

# ⚙️ NPM Commands
### Install node_modules
```
npm install
```
### Tests
```
npm test
```
### Build
```
npm run build
```
### Start
```
npm start
```

# License
MIT


