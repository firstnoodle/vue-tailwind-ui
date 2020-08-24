# Vue Tailwind UI Package
My first attempt at creating a vue-tailwind-ui (not to be confused with the product [tailwindui](https://tailwindui.com/)) ui component library as a GithubPackage.

Below are some notes on how to [create, publish](#create-and-publish-a-github-package), and [consume a GithubPackage](#consume-a-github-package) (or at least how I made it work).

In the bottom is a [setup guide](#project-setup) for this repository.


## Create and publish a Github Package
### GithubAction
Created action to publish a package on `release`
File `.github/workflows/gpr-publish.yml`

### Package.json
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

## Publish a Github Package
### GITHUB_TOKEN
[Generating access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### .npmrc file
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
