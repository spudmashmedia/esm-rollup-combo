import resolve from "rollup-plugin-node-resolve";

export default {
    input: './src/index.js',
    output: [
        {
            file: './dist/app.bundle.js',
            format: 'cjs',
            sourceMap: true
        }
    ],
    plugins: [
        resolve({
            module: true,
            modulesOnly: true
        })
    ]
}