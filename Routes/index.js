const express = require('express');
const router = express.Router();

router.use(require('./roleroute'));
router.use(require('./departmentroute'));
router.use(require('./employeeroute'));

module.exports = router;