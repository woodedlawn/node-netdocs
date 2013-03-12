/*
 * Module Dependancies
 */
var ndSoap = require('./tools/nd-soap')
	, soapPath = 'storage.asmx';

/*
 *   GetAttributes
 */
exports.getAttributes = function(cookies, objId, aAttr, fn) {

	var attrList;
		
	for (var j in aAttr) {
		attrList += '<string>' + aAttr[j] + '</string>';
	};
	
	// define variables specific to the API call
	var soapAction = 'GetAttributes'
		, soapRequest = '<objectId>' + objId + '</objectId>' +
										'<attrList>' + attrList + '</attrList>' +
										'<flags>0</flags>'

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, aAttr, cookies, function(response) {
		return fn(response);
	});
}

/*
 *   SetAttributes
 */
exports.setAttributes = function(cookies, objId, oAttr, fn) {

	var attrList
		, valList;
				
	for (name in oAttr) {
		attrList += '<string>' + name + '</string>';
		valList += '<string>' + oAttr[name] + '</string>';
	};
	
	// define variables specific to the API call
	var soapAction = 'SetAttributes'
		, soapRequest = '<objectId>' + objId + '</objectId>' +
										'<attrList>' + attrList + '</attrList>' +
										'<attrValues>' + valList + '</attrValues>' +
										'<flags>0</flags>'

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, oAttr, cookies, function(response) {
		return fn(response);
	});
}

/*
 *  Search
 */
exports.search = function(cookies, criteria, aAttr, fn) {

	var attrList;

	for (var j in aAttr) {
		attrList += '<string>' + aAttr[j] + '</string>';
	};

	// define variables specific to the API call
	var soapAction = 'Search'
		, soapRequest = '<criteria>' + criteria + '</criteria>' +
										'<attrList>' + attrList + '</attrList>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, aAttr, cookies, function(response) {
		return fn(response);
	});
}

/*
 *  Create
 */
exports.create = function(cookies, objType, name, cabGuid, oAttr, fn) {

	var attrList
		, valList;
				
	for (name in oAttr) {
		attrList += '<string>' + name + '</string>';
		valList += '<string>' + oAttr[name] + '</string>';
	};
	
	// define variables specific to the API call
	var soapAction = 'Create'
		, soapRequest = '<objType>' + objType + '</objType>' +
										'<name>' + name + '</name>' +
										'<cabGuid>' + cabGuid + '</cabGuid>' +
										'<attrList>' + attrList + '</attrList>' +
										'<valueList>' + valList + '</valueList>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, oAttr, cookies, function(response) {
		return fn(response);
	});
}

/*
 *  Delete
 */
exports.delete = function(cookies, objId, fn) {

	// define variables specific to the API call
	var soapAction = 'Delete'
		, soapRequest = '<objId>' + objId + '</objId>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, {}, cookies, function(response) {
		return fn(response);
	});
}

/*
 *  PreDelete
 */
exports.preDelete = function(cookies, objId, fn) {

	// define variables specific to the API call
	var soapAction = 'Delete'
		, soapRequest = '<objId>' + objId + '</objId>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, {}, cookies, function(response) {
		return fn(response);
	});
}

/*
 *  FileInFolder
 */
exports.fileInFolder = function(cookies, folderId, aDocs, fn) {

	var docList;

	for (var j in aDocs) {
		docList += '<string>' + aDocs[j] + '</string>';
	};

	// define variables specific to the API call
	var soapAction = 'FileInFolder'
		, soapRequest = '<folderId>' + folderId + '</folderId>' +
										'<docList>' + docList + '</docList>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, {}, cookies, function(response) {
		return fn(response);
	});
}

/*
 *  RemoveFromFolder
 */
exports.removeFromFolder = function(cookies, folderId, aDocs, fn) {

	var docList;

	for (var j in aDocs) {
		docList += '<string>' + aDocs[j] + '</string>';
	};

	// define variables specific to the API call
	var soapAction = 'RemoveFromFolder'
		, soapRequest = '<folderId>' + folderId + '</folderId>' +
										'<docList>' + docList + '</docList>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, {}, cookies, function(response) {
		return fn(response);
	});
}

/*
 *  DeleteFolder
 */
exports.deleteFolder = function(cookies, folderId, deleteFolder, subFoldersAlso, deleteContent, fn) {

	// define variables specific to the API call
	var soapAction = 'DeleteFolder'
		, soapRequest = '<folderId>' + folderId + '</folderId>' +
      '<deleteFolder>' + deleteFolder + '</deleteFolder>' +
      '<subFoldersAlso>' + subFoldersAlso + '</subFoldersAlso>' +
      '<deleteContent>' + deleteContent + '</deleteContent>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, {}, cookies, function(response) {
		return fn(response);
	});
}


/*
 * Get Attribute lookup table
 */
exports.retrieveLookupData = function(cookies, attrNum, fn) {

    // define variables specific to the API call
    var soapAction = 'RetrieveLookupData'
    	, soapRequest = '<repositoryId>CA-F6U7TVZD</repositoryId>' +
    									'<attrNum>' + attrNum + '</attrNum>' +
    									'<mode>1</mode>' +
    									'<criteria></criteria>' +
    									'<parentKey></parentKey>' +
    									'<firstItem></firstItem>' +
    									'<findDesc>false</findDesc>' +
    									'<includeClosed>true</includeClosed>' +
    									'<maxRows>40</maxRows>';

	// send the request
	ndSoap(soapPath, soapAction, soapRequest, {}, cookies, function(response) {
 		return fn(response);
	});
}