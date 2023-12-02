import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"
import dotenv from "dotenv"

const firstArg = process.argv[2]
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathAssetsBuildFile = path.join(
    __dirname,
    "..",
    "public",
    "js",
    "build",
    "constants.js"
)
const pathAssets = path.join(__dirname, "..", "public", "js", "build")
const loadEnvPath = path.join(__dirname, `.env.${firstArg}`)
const rootEnvPath = path.join(__dirname, "..", ".env")
const os = process.platform

if (firstArg === "local") {
    const chain = {
        darwin: {
            command: `cp ${loadEnvPath} ${rootEnvPath}`
        },
        linux: {
            command: `cp ${loadEnvPath} ${rootEnvPath}`
        },
        win32: {
            command: `TYPE ${loadEnvPath} > ${rootEnvPath}`
        }
    }
    execSync(chain[os].command)
    dotenv.config({ path: loadEnvPath })
}

const env = () => ({
    API_URL: process.env.API_URL
})

fs.mkdirSync(pathAssets, { recursive: true })
fs.writeFileSync(
    pathAssetsBuildFile,
    `
/** Auto Generated File Don't change */

window.env = ${JSON.stringify(env())}
`.trim()
)
