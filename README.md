[![Version](http://img.shields.io/badge/version-0.5.0-yellow.svg?style=flat)](https://www.ecofic.com)
[![Built with Gulp](https://img.shields.io/badge/built%20with-gulp-green.svg)](http://gulpjs.com/)

# What is TailorJS?
TailorJS

## What problems does TailorJS solve?
TailorJS helps solve several problems.

### Helps you build adaptive web sites
An adaptive web site enables a greater range of designs based on the user's browser's capabilities.
TailorJS helps you take advantage of those capabilities and adjust on the server-side as needed.

#### Save on bandwidth costs
If your site is hosted "in the cloud", there is a chance you have to pay for bandwidth costs. If your site
only returns the content (HTML, CSS, JavaScript, images, etc) that are needed, you will use less bandwidth. Using
less bandwidth means lower cost.

#### Improved performance
Your web site will be downloaded faster because you are only returning the content that is required. Once downloaded,
your web site will render faster. The reason why is because your site will only have to load the content that's needed.

### The server does not know enough about the user's browser.
When a user visits your website, some limited information is shared with the server. One of the missing
pieces is the width and height of the user's browser. TailorJS stores this information in either a cookie or
the query string so that you can use it on the server.

## What other features does TailorJS have?

### Query String Fallback
TailorJS uses cookies to communicate to the server which layout is in use. However,
if the user has cookies disabled in their browser, TailorJS will pass the value through 
a parameter that will be placed in the query string.

### Detects geo location abilities
TailorJS uses a token to let the server know whether the user's browser has geolocation capabilities.

# Using TailorJS

## Step-by-Step
To use TailorJS in your web app, do the following:

1. Add the TailorJS library
If you like bower, use `bower install tailorjs`

If you prefer npm, use `npm install tailorjs --save-dev`

2. Reference TailorJS in your web page.

`<script type="text/javascript" src="./tailor.js" />`
	
3. Configure Tailor.js
TailorJS relies on JSON for configuration. An example configuration can be found here:

`tailor.configure({ layout: { framework: 'bootstrap', version: '4.0.0-alpha' });`


A complete list of the available configuration options are described in the "Configuring TailorJS" 
section below.

4. Tailor your page when the window resizes. Notice the lack of `()` after `tailor`.

`window.onresize = tailor;`

## All Together
```
<script type="text/javascript" src="./tailor.js" />
<script type="text/javascript">
  tailor.configure({ layout: { framework: 'bootstrap', version: '4.0.0-alpha' });
  window.onresize = tailor;
</script>
```

# Configuring TailorJS
Configuring TailorJS involves using the following values:

## abilities

### gps

| Property Name | Possible Values | Description |
|---------------|-----------------|-------------|


## layout

| Property Name | Possible Values | Description |
|---------------|-----------------|-------------|


# Contributing to TailorJS
TailorJS is available for contribution. As new responsive frameworks (and versions of existing frameworks) emerge, 
it may make sense to update this library to include them. 
to include those breakpoints in the `tailor.supported.[framework]` section. The 

## Branching TailorJS
TailorJS uses the [GitHub Flow](https://guides.github.com/introduction/flow/) workflow.

## Developing in TailorJS
[TODO]

## Building TailorJS

`gulp`