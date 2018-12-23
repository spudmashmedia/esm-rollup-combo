import resolve from "rollup-plugin-node-resolve";
import copy from "rollup-plugin-copy";
export default {
    input: "./src/index.js",
    output: [
        {
            file: "./dist/app/app.bundle.js",
            format: "cjs",
            sourceMap: true
        }
    ],
    plugins: [
        resolve({
            module: true,
            modulesOnly: true
        }),
        copy({
            "ci/run.sh": "dist/run.sh",
            "package.json": "dist/package.json"
        })
    ],
    external: ["uuid/v1", "sequelize", "axios", "bunyan", "path"]
};
