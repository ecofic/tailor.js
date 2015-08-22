[![Version](http://img.shields.io/badge/version-0.1.0-yellow.svg?style=flat)](https://www.ecofic.com)
[![Built with Gulp](https://img.shields.io/badge/built%20with-gulp-green.svg)](http://gulpjs.com/)

# What is Tailor.js?
Tailor.js is a utility for building adaptive web apps.

## What problems does Tailor.js solve?

## What other features does Tailor.js have?

# Using Tailor.js
To use Tailor.js in your web app, do the following:

1. Add the Tailor.js library
If you like bower, use `bower install tailor.js`

If you prefer npm, use `npm install tailor.js --save-dev`

2. Reference Tailor.js in your web page.
`<script type="text/javascript" src="./tailor.js" />
	
3. Configure Tailor.js
`tailor.configure({ framework:'bootstrap', version:'4.0.0-alpha' });`

4. Tailor your page when the window resizes.
`window.onresize = tailor();`


# Contributing to Tailor.js

## Branching Tailor.js
Tailor.js uses the [GitHub Flow](https://guides.github.com/introduction/flow/) workflow.

## Building Tailor.js

`gulp`

## Testing Tailor.js

`gulp test`
