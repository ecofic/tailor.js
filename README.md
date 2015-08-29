[![Version](http://img.shields.io/badge/version-0.3.0-yellow.svg?style=flat)](https://www.ecofic.com)
[![Built with Gulp](https://img.shields.io/badge/built%20with-gulp-green.svg)](http://gulpjs.com/)

# What is Tailor.js?

## What problems does Tailor.js solve?

## What other features does Tailor.js have?

# Using Tailor.js
To use Tailor.js in your web app, do the following:

1. Add the Tailor.js library
If you like bower, use `bower install tailor.js`

If you prefer npm, use `npm install tailor.js --save-dev`

2. Reference Tailor.js in your web page.

`<script type="text/javascript" src="./tailor.js" />`
	
3. Configure Tailor.js

`tailor.configure({ framework:'bootstrap', version:'4.0.0-alpha' });`

4. Tailor your page when the window resizes. Notice the lack of `()` after `tailor`.

`window.onresize = tailor;`


# Contributing to Tailor.js
Tailor.js is available for contribution. As new responsive frameworks (and versions of existing frameworks) emerge, 
it may make sense to update this library to include them. 
to include those breakpoints in the `tailor.supported.[framework]` section. The 

## Branching Tailor.js
Tailor.js uses the [GitHub Flow](https://guides.github.com/introduction/flow/) workflow.

## Developing in Tailor.js
In short, Tailor.js 

## Building Tailor.js

`gulp`

## Testing Tailor.js
Tests for Tailor.js are written with [Jasmine](http://jasmine.github.io/). To ensure Tailor.js is robust,
pull requests must include tests covering the contribution. Tests are located in the `[./test](https://github.com/ecofic/tailor.js/tree/master/test)`
directory. To run the tests, just use:

`gulp test`
