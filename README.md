# jQuery Affilify

[![Build Status](https://travis-ci.org/j7nn7k/affilify.svg?branch=master)](https://travis-ci.org/j7nn7k/affilify)

## What it does

A jquery plugin to replace links with affiliate links on the fly. Support for Zanox, Amazon and Affilinet.


## Demo

Find some sample use cases here: http://jannikweyrich.com/affilify/


## How to use?

1. Open affiliate accounts at those services where you want to place product links to. Affilifiy currently works 
for <a href="http://www.zanox.com/" target="_blank">Zanox</a>, <a href="http://www.amazon.de/" target="_blank">Amazon</a> 
and <a href="http://www.affili.net/" target="_blank">Affilinet</a>. You can use all of them or choose which ones you
want to use.

2. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	```

3. Include the Affilify plugin's code to your page:

	```html
	<script src="dist/jquery.affilify.min.js"></script>
	```

4. Call the plugin with your affiliate network's publisher settings. Whichever you want to use:

	```javascript
	$("a").affilify({
	    zanox: {
                publisherId: "YOUR_ZANOX_PUB_ID",
                programs: [{ domain: "myprotein.com"}, { domain: "vaola.de" }]
            },
	    amazonPublisherId: "YOUR_AMAZON_PUB_ID",
        affilinet: {
            publisherId: "YOUR_AFFILINET_PUB_ID",
            programs: [
            	// add your affilinet programs here
                { domain: "fitmart.de", siteId: "12802"},  
                { domain: "sportscheck.com", siteId: "3617"}
                // ... and so on ...
            ]
        } 
	});
	```
	
## Changelog

### 2.1.1
* Fix bug caused by \#-signs in urls

### 2.1.0
* Fix mistake in demo and docs

### 2.0.0
* ( **Breaking change** ) Add support for multiple Zanox partners

### 1.0.0

* Initial release

## Contributing

Before sending a pull request remember to follow [jQuery Core Style Guide](http://contribute.jquery.org/style-guide/js/).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Make your changes on the `src` folder, never on the `dist` folder.
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request :D


## If you wanna get your hands dirty

1. Install Node:

	```
	brew install node
	```

2. Install Grunt:

	```
	npm install grunt-cli
	```

3. Clone Repo

3. cd to repo directory
	
4. Install project dependencies specified in packages.json

    ```
    npm install
    ```

5. Grunt

    ```
    grunt watch
    ```

6. Run tests
    ```
    ./node_modules/karma/bin/karma start
    ```

##TODO

* Improve performance: E.g. don't do unnecessary checks
* Test more config failures
* Test if all services are configured. if not do not run the replacement scripts
* Include travis and all that fancy CI stuff (test coverage, etc)
* Publish plugin on package managers (e.g. bower)


## Questions

Ping me on Twitter [@jnk_wyrch](http://twitter.com/jnk_wyrch).

## License

MIT License © Jannik Weyrich
