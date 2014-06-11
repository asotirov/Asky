var DataService = require('./data');
var _dataService;
var getDataService = function () {
    if(!_dataService) {
        _dataService = new DataService();
    }
    return _dataService;
}
module.exports = {
    getDataService: getDataService
}