#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
var fs = require('fs');
var path = process.cwd();
const pathInfo = require('path');
fs.readFile(path + "\\test\\schema.json", 'utf8', (err, data) => {
    const mkdirSync = function (dirPath) {
        try {
            fs.mkdirSync(dirPath);
        }
        catch (err) {
            if (err.code !== 'EEXIST')
                throw err;
        }
    };
    const mkdirpSync = function (dirPath) {
        const parts = dirPath.split(pathInfo.sep);
        // For every part of our path, call our wrapped mkdirSync()
        // on the full path until and including that part
        for (let i = 1; i <= parts.length; i++) {
            mkdirSync(pathInfo.join.apply(null, parts.slice(0, i)));
        }
    };
    data = JSON.parse(data);
    var result = index_1.Generator.Generate(data);
    (data || []).forEach((d, index) => {
        var _folder = (d.path || (path + '\\schema')) + "\\" + d.name;
        mkdirpSync(_folder);
        fs.writeFile(_folder + ("\\I" + d.name + ".ts"), [result[index].dependancy, result[index].interface].join("\n\n"), (err, data) => {
            if (err)
                console.log(err);
        });
        fs.writeFile(_folder + ("\\" + d.name + "Field.ts"), result[index].enum, (err, data) => {
            if (err)
                console.log(err);
        });
        fs.writeFile(_folder + ("\\Base" + d.name + ".ts"), [result[index].dependancy, result[index].base].join("\n\n"), (err, data) => {
            if (err)
                console.log(err);
        });
        fs.writeFile(_folder + ("\\" + d.name + ".ts"), result[index].class, (err, data) => {
            if (err)
                console.log(err);
        });
    });
});
