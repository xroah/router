import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs"
import ts from "@rollup/plugin-typescript"
import {terser} from "rollup-plugin-terser"

const outputCommons = {
    format: "umd",
    name: "router"
}

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/router.js",
            ...outputCommons
        },
        {
            file: "dist/router.min.js",
            ...outputCommons,
            sourcemap: true,
            plugins: [terser()]
        }
    ],
    plugins: [cjs(), resolve(), ts()]
}