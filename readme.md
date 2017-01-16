# Introduction

This is a simple todo-list with authorization written on Laravel 5 on back-end and Vue.js on a front-end.

# Installation

1. ```composer install```
2. ```npm install```
3. ```touch ./database/database.sqlite```
4. ```php artisan migrate```
5. ```php artisan serve```
6. Visit your http://localhost:8000

# Testing
1. To run front-end tests make sure you have your web server running. If your server has different URI than (http://localhost:8000) you can specify it in ```tests/acceptance/constants.js``` file.
2. Install protractor tool and update web-driver manager with following commands:
```bash 
sudo npm install -g protractor
```
```bash
webdriver-manager update
```

3. Run tests with ```npm run tests```