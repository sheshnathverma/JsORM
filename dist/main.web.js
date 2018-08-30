"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
function generate(data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    return index_1.Generator
        .Generate(data)
        .map((item) => {
        return [item.dependancy, item.interface, item.enum, item.base, item.class].join("\n\n");
    });
}
exports.generate = generate;
