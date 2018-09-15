#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
var fs = require('fs');
var _path = require('path');
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
    const copyRecursiveSync = function (src, dest) {
        var exists = fs.existsSync(src);
        var stats = exists && fs.statSync(src);
        var isDirectory = exists && stats.isDirectory();
        if (exists && isDirectory) {
            mkdirpSync(dest);
            fs.readdirSync(src).forEach(function (childItemName) {
                copyRecursiveSync(_path.join(src, childItemName), _path.join(dest, childItemName));
            });
        }
        else {
            //fs.linkSync(src, dest);
            fs.copyFileSync(src, dest);
        }
    };
    var _base_folder = (path + '\\schema');
    var _core_folder = (_base_folder + '\\core');
    var _enum_folder = (_base_folder + '\\enum');
    mkdirpSync(_core_folder);
    mkdirpSync(_enum_folder);
    copyRecursiveSync(path + "\\src\\base", _core_folder + "\\base");
    copyRecursiveSync(path + "\\src\\schema", _core_folder + "\\schema");
    copyRecursiveSync(path + "\\src\\serializable", _core_folder + "\\serializable");
    copyRecursiveSync(path + "\\src\\utils", _core_folder + "\\utils");
    fs.writeFile(_core_folder + '\\index.ts', [
        "./base/ABaseEntity",
        "./base/IBaseEntity",
        "./schema/FieldType",
        "./schema/IField",
        "./schema/ISchema",
        "./serializable/ISerializable",
        "./serializable/ASerializable",
        "./utils/Utils",
    ].map(e => `export * from '` + e + `';`).join('\n'), (err, data) => {
        if (err)
            console.log(err);
    });
    data = JSON.parse(data);
    var result = index_1.Generator.Generate(data);
    var enums = [];
    (data || []).forEach((d, index) => {
        var _folder = (path + '\\schema\\base') + "\\" + d.name;
        mkdirpSync(_base_folder);
        mkdirpSync(_folder);
        fs.writeFile(_folder + ("\\I" + d.name + ".ts"), result[index].interface.replace(/\/\/import \{/g, 'import {'), (err, data) => {
            if (err)
                console.log(err);
        });
        fs.writeFile(_folder + ("\\" + d.name + "Field.ts"), result[index].enum.replace(/\/\/import \{/g, 'import {'), (err, data) => {
            if (err)
                console.log(err);
        });
        fs.writeFile(_folder + ("\\Base" + d.name + ".ts"), result[index].base.replace(/\/\/import \{/g, 'import {'), (err, data) => {
            if (err)
                console.log(err);
        });
        enums = enums.concat(index_1.Generator.getEnumDependancy(d));
        try {
            fs.statSync(_base_folder + ("\\" + d.name + ".ts"));
        }
        catch (e) {
            fs.writeFile(_base_folder + ("\\" + d.name + ".ts"), result[index].class.replace(/\/\/import \{/g, 'import {'), (err, data) => {
                if (err)
                    console.log(err);
            });
        }
    });
    enums.filter((e, i, self) => { return self.indexOf(e) === i; }).sort();
    enums.forEach(e => {
        try {
            fs.statSync(_enum_folder + ("\\" + e + ".ts"));
        }
        catch (ex) {
            fs.writeFile(_enum_folder + ("\\" + e + ".ts"), 'export enum ' + e + ` {

}`, (err, data) => {
                if (err)
                    console.log(err);
            });
        }
    });
    fs.writeFile(_enum_folder + '\\index.ts', enums.map(e => `export * from './` + e + `';`).join('\n'), (err, data) => {
        if (err)
            console.log(err);
    });
    fs.readdir(_base_folder, (err, files) => {
        if (err)
            throw err;
        fs.writeFile(_base_folder + '\\index.ts', 'export * from \'./enum/index\';\n' +
            (files || [])
                .filter((fn) => {
                return (fn.match(/\.[ts]+$/i) || fn === "index.ts");
            })
                .map((fn) => {
                return `export * from './` + fn.substring(0, fn.lastIndexOf('.ts')) + `';`;
            }).join("\n"), (err, data) => {
            if (err)
                console.log(err);
        });
    });
});
