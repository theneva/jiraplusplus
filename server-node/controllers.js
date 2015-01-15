var router = require('express').Router();

router.use('/', require('./controllers/personal'));
router.use('/sessions', require('./controllers/sessions'));
router.use('/users', require('./controllers/users'));
router.use('/projects', require('./controllers/projects'));

module.exports = router;
