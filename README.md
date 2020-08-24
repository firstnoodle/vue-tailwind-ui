# vue-tailwind-ui

My first attempt at creating a ui library GithubPackage.
It is built using Vue (and soon tailwindcss), but is not working yet.
So far I'm just figuring out how to set everything up.

## Steps to publish and consume a GithubPackage

### Package repo
#### GithubAction
Created action to publish a package on `release`
File `.github/workflows/gpr-publish.yml`

#### Package.json
Setup the right configurations and fields:
- package name should be scoped (@username/package-name)
- version number is required
- private should be false
- repository - not required, but nice to have
- publushConfig
- main - entry point for the package
``` json
{
    "name": "@firstnoodle/vue-tailwind-ui",
    "version": "0.2.0",
    "private": false,
    "repository": {
        "type": "git",
        "url": "https://github.com/firstnoodle/vue-tailwind-ui.git"
    },
    "publishConfig": {
        "registry": "https://npm.pkg.github.com/"
    },
    "main": "./dist/vue-tailwind-ui.common.js",
}
```

### Consumer repo
#### GITHUB_TOKEN
[Generating access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

#### .npmrc file
```
registry=https://npm.pkg.github.com/firstnoodle
//npm.pkg.github.com/:_authToken=GITHUB_TOKEN
```

#### Add dependency to package.json
``` json
"dependencies": {
     "@firstnoodle/vue-tailwind-ui": "v0.2.0"
}
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and exports library/package
```
npm run build-lib
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
