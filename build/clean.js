var path = require('path')
var rimraf = require('rimraf')

// 清空 dist
// rimraf.sync(path.join(__dirname, '../dist'))
// window 使用sync会报ENOTEMPTY错 ，默认maxBusyTries是3，改为10
rimraf(path.join(__dirname, '../dist'), { maxBusyTries: 10 }, function () {})