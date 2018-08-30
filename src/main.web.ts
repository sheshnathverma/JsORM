import { Generator } from './index';

export function generate(data: any) {
    if (!Array.isArray(data)) {
        data = [data];
    }

    return Generator
        .Generate(data)
        .map((item) => {
            return [item.dependancy, item.interface, item.enum, item.base, item.class].join("\n\n")
        });
}