module.exports = function parseString2Array(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim());
}