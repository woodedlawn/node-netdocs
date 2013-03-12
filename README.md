node-netdocs [![Build Status](https://travis-ci.org/woodedlawn/node-netdocs.png?branch=master)](https://travis-ci.org/woodedlawn/node-netdocs)
============

## Purpose

To provide access to the NetDocuments Soap API within node.js applications.

## Overview

Javascript functions which accept:

* variables as described in the NetDocuments API documentation
* authentication cookies as needed
* a callback function to be processed after the response

The soap layer is abstracted away and functions return json.

## Methods

The API includes both a storage endpoint and a directory endpoint which are reference in the functions below.

### Directory

__Login__

	directory.login(username, password, fn)
	
	username = string
	password = string
	
	returns an array of cookies

__GetAttributes__

	directory.getAttributes(cookies, objId, aAttr, fn)
	
	cookies = array of cookies
	objId = string
	aAttr = array of attributes
	
	returns an object

__SetAttributes__

	directory.setAttributes(cookies, objId, oAttr, fn)
	
	cookies = array of cookies
	objId = string
	oAttr = object of attributes(keys) and values
	
	returns an empty reponse on success

### Storage

__GetAttributes__

	storage.getAttributes(cookies, objId, aAttr, fn)
	
	cookies = array of cookies
	objId = string
	aAttr = array of attributes
	
	returns an object

__SetAttributes__

	storage.setAttributes(cookies, objId, oAttr, fn)
	
	cookies = array of cookies
	objId = string
	oAttr = object of attributes(keys) and values
	
	returns an empty reponse on success

__Search__

	storage.search(cookies, criteria, aAttr, fn)
	
	cookies = array of cookies
	criteria = string
	aAttr = array of attributes
	
	returns an object

__Create__

	storage.create(cookies, objType, name, cabGuid, oAttr, fn)
	
	cookies = array of cookies
	objType = string
	name = string
	cabGuid = string
	oAttr = object of attributes(keys) and values

	returns a string containing new object id

__Delete__

	storage.delete(cookies, objId, fn)
	
	cookies = array of cookies
	objId = string

	returns an empty reponse on success

__PreDelete__

	storage.preDelete(cookies, objId, fn)
	
	cookies = array of cookies
	objId = string

	returns an empty reponse on success

__FileInFolder__

	storage.fileInFolder(cookies, folderId, aDocs, fn)
	
	cookies = array of cookies
	folderId = string
	aDocs = array of document ids
	
	returns an empty reponse on success

__RemoveFromFolder__

	storage.removeFromFolder(cookies, folderId, aDocs, fn)
	
	cookies = array of cookies
	folderId = string
	aDocs = array of document ids
	
	returns an empty reponse on success

__DeleteFolder__

	storage.deleteFolder(cookies, folderId, deleteFolder, subFoldersAlso, deleteContent, fn)
	
	cookies = array of cookies
	folderId = string
	deleteFolder = boolean
	subFoldersAlso = boolean
	deleteContent = boolean
	
	returns an empty reponse on success
	
__RetrieveLookupData__

	storage.retrieveLookupData(cookies, , fn)
	
	cookies = array of cookies
	attrNum = integer
	
	returns an object