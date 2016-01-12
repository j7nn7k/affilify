# jQuery Affilify

## What it does

A jquery plugin to replace links with affiliate links on the fly. Support for Zanox, Amazon (TODO), Affilinet (TODO).

## How to use?

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.affilify.min.js"></script>
	```

3. Call the plugin with your zanox publisher id:

	```javascript
	$("a").affilify({
	    zanoxPublisherId: "36434335C584445997"
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

## License

MIT License © Jannik Weyrich
