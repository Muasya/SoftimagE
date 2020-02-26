const express = require('express');
const router = express.Router();

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */


router.get('/', (req, res) => {
	res.render('chart', {text: 'charts are here'})
})

module.exports = router