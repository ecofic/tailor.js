[![Version](http://img.shields.io/badge/version-0.3.0-yellow.svg?style=flat)](https://www.ecofic.com)
[![Built with Gulp](https://img.shields.io/badge/built%20with-gulp-green.svg)](http://gulpjs.com/)

# What is TailorJS?
TailorJS IS IN DEVELOPMENT. DO NOT USE AT THIS TIME.

## What problems does TailorJS solve?
[TODO]

## What other features does TailorJS have?

### Query String Fallback
TailorJS uses cookies to communicate to the server which layout is in use. However,
if the user has cookies disabled in their browser, TailorJS will pass the value through 
a parameter that will be placed in the query string.

# Using TailorJS
To use TailorJS in your web app, do the following:

1. Add the TailorJS library
If you like bower, use `bower install tailorjs`

If you prefer npm, use `npm install tailorjs --save-dev`

2. Reference TailorJS in your web page.

`<script type="text/javascript" src="./tailor.js" />`
	
3. Configure Tailor.js

`tailor.configure({ framework:'bootstrap', version:'4.0.0-alpha' });`

A complete list of configuration options are described in the "Configuring TailorJS" 
section below.

4. Tailor your page when the window resizes. Notice the lack of `()` after `tailor`.

`window.onresize = tailor;`

# Configuring TailorJS
[TODO]

# Contributing to TailorJS
Tailor.js is available for contribution. As new responsive frameworks (and versions of existing frameworks) emerge, 
it may make sense to update this library to include them. 
to include those breakpoints in the `tailor.supported.[framework]` section. The 

## Branching TailorJS
TailorJS uses the [GitHub Flow](https://guides.github.com/introduction/flow/) workflow.

## Developing in TailorJS
[TODO]

## Building TailorJS

`gulp`