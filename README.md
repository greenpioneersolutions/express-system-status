# Express-System-Status
Add Routes to check the env , configs &amp; status of your system


Installation
--------------------
```javascript
var express = require('express')
var app = express()
var status = require('express-system-status')
```

Usage
--------------------
```javascript
var config = {
  mongo: 'mongodb://localhost/test',
  system:'configs'
}
app.use('/api/v1/system/status', 
	status({
	  app: app,
	  config: config,
	  auth: true,
	  user: 'admin',
	  pass: 'pass',
	  extra: {},
	  mongoose:mongoose //Now Supporting Mongoose
	})
)
```

API
--------------------
```javascript
// http://localhost:3000/api/v1/system/status/status.html
// http://localhost:3000/api/v1/system/status/api

//Sample Object
{
    config: {
        mongo: "mongodb://localhost/test"
    }
    dns: {
        servers: ["192.168.1.255"]
    }
    express: {,
        …
    }
    extra: {}
    global: {
        __dirname: "/Users/greenpioneer/Documents/repos/express-system-status",
        …
    }
    os: {
        EOL: "↵",
        arch: "x64",
        cpus: [{
            model: "Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz",
            speed: 2200,
            …
        }, …],
        …
    }
    process: {,
        …
    },
    mongoose: {
    	readyState: 1,
  		closeCalled: false,
  		hasOpened: true,
  		listening: false,
  		models:{…},
  		…
    }
}

```

Future
---------------------------------
- Update GUI
- Add DB status checks
- Refactor
- Update Tests

Change Log
---------------------------------
### 0.1.0 
- Init Release

### 0.2.0 
- Added Mongoose Support

License
---------------------------------
The MIT License (MIT)

Copyright (c) 2014-2015 Green Pioneer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Contributing
---------------------------------
### How to contribute

Support and contributions from the open source community are essential for keeping
express-system-status up to date. We are always looking for the quality contributions and 
will be happy to accept your Pull Requests as long as those adhere to some basic rules:

* Please make sure that your contribution fits well in the project's style & concept:
* JS Standard
* Pass All Test ( once testing has been fully implement)

### Creating an Issue

Before you create a new Issue:
* Check the [Issues](https://github.com/greenpioneersolutions/express-system-status/issues) on Github to ensure one doesn't already exist.
* Place use one of these topics in the beginning of your issue title- Contrib, Hotfix, Error, Help or Feature.
* Clearly describe the issue, including the steps to reproduce the issue.
* If it's a new feature, enhancement, or restructure, Explain your reasoning on why you think it should be added, as well as a particular use case.

### Making Changes

* Create a topic branch from the development branch.
* Use `standard` to verify your style - `npm install -g standard` if you dont have it already
* Keep git commit messages clear and appropriate
* Make Sure you have added any tests necessary to test your code.
* Update the Documentation to go along with any changes in functionality / improvements in a separate pull request against the gh-pages branch.

### Submitting the Pull Request

* Push your changes to your topic branch on your fork of the repo.
* Submit a pull request from your topic branch to the development branch
* We use [GitFlow](https://guides.github.com/introduction/flow/)
* Be sure to tag any issues your pull request is taking care of / contributing to.
  * By adding "Closes #xyz" to a commit message will auto close the issue once the pull request is merged in.