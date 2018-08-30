#!/usr/bin/env node

import { Generator, ISchema } from './index'
var fs = require('fs');
var path = process.cwd();

const pathInfo = require('path')
fs.readFile(path + "\\test\\schema.json", 'utf8', (err: any, data: any) => {

    const mkdirSync = function (dirPath: any) {
        try {
            fs.mkdirSync(dirPath)
        } catch (err) {
            if (err.code !== 'EEXIST') throw err
        }
    }

    const mkdirpSync = function (dirPath: any) {
        const parts = dirPath.split(pathInfo.sep)

        // For every part of our path, call our wrapped mkdirSync()
        // on the full path until and including that part
        for (let i = 1; i <= parts.length; i++) {
            mkdirSync(pathInfo.join.apply(null, parts.slice(0, i)))
        }
    }

    data = JSON.parse(data);
    var result = Generator.Generate(data);
    (data || []).forEach((d: ISchema, index: number) => {
        var _folder = (d.path || (path + '\\schema')) + "\\" + d.name;

        mkdirpSync(_folder);

        fs.writeFile(_folder + ("\\I" + d.name + ".ts"), [result[index].dependancy, result[index].interface].join("\n\n"), (err: any, data: any) => {
            if (err) console.log(err);
        });

        fs.writeFile(_folder + ("\\" + d.name + "Field.ts"), result[index].enum, (err: any, data: any) => {
            if (err) console.log(err);
        });

        fs.writeFile(_folder + ("\\Base" + d.name + ".ts"), [result[index].dependancy, result[index].base].join("\n\n"), (err: any, data: any) => {
            if (err) console.log(err);
        });

        fs.writeFile(_folder + ("\\" + d.name + ".ts"), result[index].class, (err: any, data: any) => {
            if (err) console.log(err);
        });
    })

});
