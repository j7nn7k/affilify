# jQuery Affilify

## What it does

A jquery plugin to replace links with affiliate links on the fly. Support for Zanox, Amazon and Affilinet.

## How to use?

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.affilify.min.js"></script>
	```

3. Call the plugin with your affiliate networks publisher settings:

	```javascript
	$("a").affilify({
	    zanoxPublisherId: "YOUR_ZANOX_PUB_ID",
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
* Include travis and all that fancy CI stuff (test coverage, build status, etc)
* Publish plugin on package managers (e.g. bower)

## License

MIT License © Jannik Weyrich
