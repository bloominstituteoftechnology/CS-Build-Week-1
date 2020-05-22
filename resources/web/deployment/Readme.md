# Deploying Your Simulation


## GitHub Pages
### 1. Ensure app is working locally

### 2. Install _gh-pages_

```
$ npm install --save gh-pages
```

   OR

```
npm install gh-pages --save-dev
```

### 3. Modify the **package.json file** of the project by adding the following statements:

```
"homepage": "https://<github-username>.github.io/<github-repo-name>/",
```


```
"scripts": {
    ...    
    "predeploy": "npm run build",    
    "deploy": "gh-pages -d build",   
    ...  
   },
```

### 4. Deploy application
```
$ npm run deploy
```

* If you get the error `fatal: A branch named 'gh-pages' already exists`, try:
```
rm -rf node_modules/gh-pages/.cache
```

### 5. Ensure GitHub Pages is enabled with your repository
   * Go to _Settings_
   ![settings](https://github.com/LambdaSchool/Conways-Life/blob/master/github-settings.png?raw=true)
   * Enable GitHub Pages
   * Set the source to be the _gh-pages branch_
   ![source](https://github.com/LambdaSchool/Conways-Life/blob/master/pages-source.png?raw=true)
   
### 6. View your app at **https://[github-username].github.io/[github-repo-name]/**

#### References
[Deploy React to GitHub-Pages to create an amazing website!](https://codeburst.io/deploy-react-to-github-pages-to-create-an-amazing-website-42d8b09cd4d)


## Heroku
* [Deploy the app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)
