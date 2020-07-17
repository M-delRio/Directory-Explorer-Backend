# API
## Overview
This API can be used to retrieve information about the content of a folder on the application server. The target folder will be referred to as the *source folder*. Successful requests, as detailed below, will return a JSON object. The return object  includes a list of files and subdirectories directly within the source folder. 

## Requests

### Base URL (TBD)
`https://hostname:3001`

### GET Request
`GET /folders`

#### Request body
Submit a query string to view a folder path:
```cli
key: "path"
value: "images/company_retreat"
```

This path will be joined to the server's home directory to form an absolute path. Valid paths include the home directory  itself (by submitting an empty string or `./`) and any descendant folders of the home directory. Parent folders of the server's home directory are not accessible (requests with `..` used in any part of the path to move up a directory will be rejected).

#### Response body - Success
```json
{
    "message": "Folder content successfully retrieved",
    "data": {
        "sourceFolder": "images/company_retreat",
        "files": [{fileObject1}, {fileObject2}, {fileObject3}],
        "subFolders": ["2020", "2019", "2018"],
        "fileCount": 45,
        "totalFileSize": 500000000
    }
}
```

##### Attributes
- **message**(string): indication of whether the request succeeded or not


**data**: this object will only be present in the case of a successful request
- **sourceFolder**(string): the submitted source folder path
- **files**(array): object representation of files (see file object description below) within the source folder sorted by file size 
- **subFolders**(array): the child subfolders of the source folder
- **fileCount**(array): number of files within the source folder
- **totalFileSize**(array): total size in bytes of the files within the source folder

#### File Objects
```json
{
  "name": "group_shot.jpg",
  "size": 5000000,
  "dateLastModified": "Fri Jan 17 2020 16:36:08 GMT-0500 (Eastern Standard Time)"
}
```

##### Attributes
- **name**(string): file name
- **size**(integer): file size in bytes
- **lastModifiedDate**(string): date and time when a file was last modified

## Error Handling

Standard HTTP codes are used to convey whether a request is successful or if an error occured. In the case of a failed request a JSON object will be returned with a single *message* attribute. 

### Example Response - Request for a non existant source folder

```json
{
  "message": "Folder not found!"  
}
```



