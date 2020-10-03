# Vue Tailwind UI Package
My first attempt at creating a vue-tailwind-ui (not to be confused with the product [tailwindui](https://tailwindui.com/)) ui component library as a GithubPackage.

## Index
- [Create and publish a Github Package](#create-and-publish-a-github-package)
- [Consume a GithubPackage](#consume-a-github-package)
- [Setup guide for this repo](#project-setup)

<br><br>

# Create and publish a Github Package
<br>

## GithubAction that publishes package on `release`
Created github action action file `gpr-publish.yml`
Find it in .github/workflows
<br>
<br>

## Build-script in package.json
``` json
{
    "build-lib": "vue-cli-service build --target lib --name vue-tailwind-ui src/main.js",
}
```
<br>

## Package.json - Setup the right configurations and fields
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

<br><br>

# Consume a Github Package
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

<br><br>

# Project setup
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

### Run (demo) specific components
```
vue serve [path/to/component]
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
