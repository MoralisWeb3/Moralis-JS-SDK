'use strict';
let FileSystemAdapter = require('../index.js');
var fs = require('fs');
var path = require('path');

describe('File encryption tests', () => {
    const directory = 'sub1/sub2';

    afterEach(function() {
        //Use adapter to make directory if needed
        var adapter = new FileSystemAdapter({
            filesSubDirectory: directory
        });
        const filePath = path.join('files', directory);
        var fileNames = fs.readdirSync(filePath);
        fileNames.filter(fileName => fileName.indexOf('.') === 0);
        fileNames.forEach(fileName => {
            fs.unlinkSync(path.join(filePath, fileName));
        })
    });

    it('should create file location based on config', async function () {
      var fsAdapter = new FileSystemAdapter();
      var config = {mount: '/parse', applicationId: 'yolo'}
      let location = fsAdapter.getFileLocation(config, 'hello.txt')
      expect(location).toBe('/parse/files/yolo/hello.txt');
    }, 5000)

    it("should save encrypted file in default directory", async function() {
        var adapter = new FileSystemAdapter({
            encryptionKey: '89E4AFF1-DFE4-4603-9574-BFA16BB446FD'
        });
        var filename = 'file2.txt';
        const filePath = 'files/'+filename;
        await adapter.createFile(filename, "hello world", 'text/utf8');
        const result = await adapter.getFileData(filename);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual("hello world");
        const data = fs.readFileSync(filePath);
        expect(data.toString('utf-8')).not.toEqual("hello world");
    }, 5000);

    it("should save encrypted file in specified directory", async function() {
        var adapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: '89E4AFF1-DFE4-4603-9574-BFA16BB446FD'
        });
        var filename = 'file2.txt';
        const filePath = 'files/'+directory+'/'+filename;
        await adapter.createFile(filename, "hello world", 'text/utf8');
        const result = await adapter.getFileData(filename);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual("hello world");
        const data = fs.readFileSync(filePath);
        expect(data.toString('utf-8')).not.toEqual("hello world");
    }, 5000);

    it("should save encrypted file in specified directory when directory starts with /", async function() {
        var adapter = new FileSystemAdapter({
            filesSubDirectory: '/sub1/sub2',
            encryptionKey: '89E4AFF1-DFE4-4603-9574-BFA16BB446FD'
        });
        var filename = 'file2.txt';
        const filePath = 'files/'+directory+'/'+filename;
        await adapter.createFile(filename, "hello world", 'text/utf8');
        const result = await adapter.getFileData(filename);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual("hello world");
        const data = fs.readFileSync(filePath);
        expect(data.toString('utf-8')).not.toEqual("hello world");
    }, 5000);

    it("should rotate key of all unencrypted files to encrypted files", async function() {
        const unEncryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory
        });
        const encryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: '89E4AFF1-DFE4-4603-9574-BFA16BB446FD'
        });
        const fileName1 = 'file1.txt';
        const data1 = "hello world";
        const fileName2 = 'file2.txt';
        const data2 = "hello new world";
        const filePath1 = 'files/'+directory+'/'+fileName1;
        const filePath2 = 'files/'+directory+'/'+fileName2;
        //Store unecrypted files
        await unEncryptedAdapter.createFile(fileName1, data1, 'text/utf8');
        var result = await unEncryptedAdapter.getFileData(fileName1);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data1);
        const unEncryptedData1 = fs.readFileSync(filePath1);
        await unEncryptedAdapter.createFile(fileName2, data2, 'text/utf8');
        result = await unEncryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const unEncryptedData2 = fs.readFileSync(filePath2);
        //Check if encrypted adapter can read data and make sure it's not the same as unEncrypted adapter
        const {rotated, notRotated} =  await encryptedAdapter.rotateEncryptionKey();
        expect(rotated.length).toEqual(2);
        expect(rotated.filter(function(value){ return value === fileName1;}).length).toEqual(1);
        expect(rotated.filter(function(value){ return value === fileName2;}).length).toEqual(1);
        expect(notRotated.length).toEqual(0);
        result = await encryptedAdapter.getFileData(fileName1);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data1);
        const encryptedData1 = fs.readFileSync(filePath1);
        expect(encryptedData1.toString('utf-8')).not.toEqual(unEncryptedData1);
        result = await encryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const encryptedData2 = fs.readFileSync(filePath2);
        expect(encryptedData2.toString('utf-8')).not.toEqual(unEncryptedData2);
    }, 5000);

    it("should rotate key of all old encrypted files to files encrypted with a new key", async function() {
        const oldEncryptionKey = 'oldKeyThatILoved';
        const oldEncryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: oldEncryptionKey
        });
        const encryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: 'newKeyThatILove'
        });
        const fileName1 = 'file1.txt';
        const data1 = "hello world";
        const fileName2 = 'file2.txt';
        const data2 = "hello new world";
        const filePath1 = 'files/'+directory+'/'+fileName1;
        const filePath2 = 'files/'+directory+'/'+fileName2;
        //Store original encrypted files
        await oldEncryptedAdapter.createFile(fileName1, data1, 'text/utf8');
        var result = await oldEncryptedAdapter.getFileData(fileName1);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data1);
        const oldEncryptedData1 = fs.readFileSync(filePath1);
        await oldEncryptedAdapter.createFile(fileName2, data2, 'text/utf8');
        result = await oldEncryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const oldEncryptedData2 = fs.readFileSync(filePath2);
        //Check if encrypted adapter can read data and make sure it's not the same as unEncrypted adapter
        const {rotated, notRotated} =  await encryptedAdapter.rotateEncryptionKey({oldKey: oldEncryptionKey});
        expect(rotated.length).toEqual(2);
        expect(rotated.filter(function(value){ return value === fileName1;}).length).toEqual(1);
        expect(rotated.filter(function(value){ return value === fileName2;}).length).toEqual(1);
        expect(notRotated.length).toEqual(0);
        var result2 = await encryptedAdapter.getFileData(fileName1);
        expect(result2 instanceof Buffer).toBe(true);
        expect(result2.toString('utf-8')).toEqual(data1);
        const encryptedData1 = fs.readFileSync(filePath1);
        expect(encryptedData1.toString('utf-8')).not.toEqual(oldEncryptedData1);
        result = await encryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const encryptedData2 = fs.readFileSync(filePath2);
        expect(encryptedData2.toString('utf-8')).not.toEqual(oldEncryptedData2);
    }, 5000);

    it("should rotate key of all old encrypted files to unencrypted files", async function() {
        const oldEncryptionKey = 'oldKeyThatILoved';
        const oldEncryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: oldEncryptionKey
        });
        const unEncryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory
        });
        const fileName1 = 'file1.txt';
        const data1 = "hello world";
        const fileName2 = 'file2.txt';
        const data2 = "hello new world";
        const filePath1 = 'files/'+directory+'/'+fileName1;
        const filePath2 = 'files/'+directory+'/'+fileName2;
        //Store original encrypted files
        await oldEncryptedAdapter.createFile(fileName1, data1, 'text/utf8');
        var result = await oldEncryptedAdapter.getFileData(fileName1);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data1);
        const oldEncryptedData1 = fs.readFileSync(filePath1);
        await oldEncryptedAdapter.createFile(fileName2, data2, 'text/utf8');
        result = await oldEncryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const oldEncryptedData2 = fs.readFileSync(filePath2);
        //Check if unEncrypted adapter can read data and make sure it's not the same as oldEncrypted adapter
        const {rotated, notRotated} =  await unEncryptedAdapter.rotateEncryptionKey({oldKey: oldEncryptionKey});
        expect(rotated.length).toEqual(2);
        expect(rotated.filter(function(value){ return value === fileName1;}).length).toEqual(1);
        expect(rotated.filter(function(value){ return value === fileName2;}).length).toEqual(1);
        expect(notRotated.length).toEqual(0);
        var result2 = await unEncryptedAdapter.getFileData(fileName1);
        expect(result2 instanceof Buffer).toBe(true);
        expect(result2.toString('utf-8')).toEqual(data1);
        const encryptedData1 = fs.readFileSync(filePath1);
        expect(encryptedData1.toString('utf-8')).not.toEqual(oldEncryptedData1);
        result = await unEncryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const encryptedData2 = fs.readFileSync(filePath2);
        expect(encryptedData2.toString('utf-8')).not.toEqual(oldEncryptedData2);
    }, 5000);

    it("should only encrypt specified fileNames with the new key", async function() {
        const oldEncryptionKey = 'oldKeyThatILoved';
        const oldEncryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: oldEncryptionKey
        });
        const encryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: 'newKeyThatILove'
        });
        const unEncryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory
        });
        const fileName1 = 'file1.txt';
        const data1 = "hello world";
        const fileName2 = 'file2.txt';
        const data2 = "hello new world";
        const filePath1 = 'files/'+directory+'/'+fileName1;
        const filePath2 = 'files/'+directory+'/'+fileName2;
        //Store original encrypted files
        await oldEncryptedAdapter.createFile(fileName1, data1, 'text/utf8');
        var result = await oldEncryptedAdapter.getFileData(fileName1);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data1);
        const oldEncryptedData1 = fs.readFileSync(filePath1);
        await oldEncryptedAdapter.createFile(fileName2, data2, 'text/utf8');
        result = await oldEncryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const oldEncryptedData2 = fs.readFileSync(filePath2);
        //Inject unecrypted file to see if causes an issue
        const fileName3 = 'file3.txt';
        const data3 = "hello past world";
        await unEncryptedAdapter.createFile(fileName3, data3, 'text/utf8');
        //Check if encrypted adapter can read data and make sure it's not the same as unEncrypted adapter
        const {rotated, notRotated} =  await encryptedAdapter.rotateEncryptionKey({oldKey: oldEncryptionKey, fileNames: [fileName1,fileName2]});
        expect(rotated.length).toEqual(2);
        expect(rotated.filter(function(value){ return value === fileName1;}).length).toEqual(1);
        expect(rotated.filter(function(value){ return value === fileName2;}).length).toEqual(1);
        expect(notRotated.length).toEqual(0);
        expect(rotated.filter(function(value){ return value === fileName3;}).length).toEqual(0);
        var result2 = await encryptedAdapter.getFileData(fileName1);
        expect(result2 instanceof Buffer).toBe(true);
        expect(result2.toString('utf-8')).toEqual(data1);
        const encryptedData1 = fs.readFileSync(filePath1);
        expect(encryptedData1.toString('utf-8')).not.toEqual(oldEncryptedData1);
        result = await encryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const encryptedData2 = fs.readFileSync(filePath2);
        expect(encryptedData2.toString('utf-8')).not.toEqual(oldEncryptedData2);
    }, 5000);

    it("should return fileNames of those it can't encrypt with the new key", async function() {
        const oldEncryptionKey = 'oldKeyThatILoved';
        const oldEncryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: oldEncryptionKey
        });
        const encryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory,
            encryptionKey: 'newKeyThatILove'
        });
        const unEncryptedAdapter = new FileSystemAdapter({
            filesSubDirectory: directory
        });
        const fileName1 = 'file1.txt';
        const data1 = "hello world";
        const fileName2 = 'file2.txt';
        const data2 = "hello new world";
        const filePath1 = 'files/'+directory+'/'+fileName1;
        const filePath2 = 'files/'+directory+'/'+fileName2;
        //Store original encrypted files
        await oldEncryptedAdapter.createFile(fileName1, data1, 'text/utf8');
        var result = await oldEncryptedAdapter.getFileData(fileName1);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data1);
        const oldEncryptedData1 = fs.readFileSync(filePath1);
        await oldEncryptedAdapter.createFile(fileName2, data2, 'text/utf8');
        result = await oldEncryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const oldEncryptedData2 = fs.readFileSync(filePath2);
        //Inject unecrypted file to cause an issue
        const fileName3 = 'file3.txt';
        const data3 = "hello past world";
        const filePath3 = 'files/'+directory+'/'+fileName3;
        await unEncryptedAdapter.createFile(fileName3, data3, 'text/utf8');
        var result = await unEncryptedAdapter.getFileData(fileName3);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data3);
        //Check if encrypted adapter can read data and make sure it's not the same as unEncrypted adapter
        const {rotated, notRotated} =  await encryptedAdapter.rotateEncryptionKey({oldKey: oldEncryptionKey});
        expect(rotated.length).toEqual(2);
        expect(rotated.filter(function(value){ return value === fileName1;}).length).toEqual(1);
        expect(rotated.filter(function(value){ return value === fileName2;}).length).toEqual(1);
        expect(notRotated.length).toEqual(1);
        expect(notRotated.filter(function(value){ return value === fileName3;}).length).toEqual(1);
        var result2 = await encryptedAdapter.getFileData(fileName1);
        expect(result2 instanceof Buffer).toBe(true);
        expect(result2.toString('utf-8')).toEqual(data1);
        const encryptedData1 = fs.readFileSync(filePath1);
        expect(encryptedData1.toString('utf-8')).not.toEqual(oldEncryptedData1);
        result = await encryptedAdapter.getFileData(fileName2);
        expect(result instanceof Buffer).toBe(true);
        expect(result.toString('utf-8')).toEqual(data2);
        const encryptedData2 = fs.readFileSync(filePath2);
        expect(encryptedData2.toString('utf-8')).not.toEqual(oldEncryptedData2);
    }, 5000);
})
