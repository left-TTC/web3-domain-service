import { execSync, exec } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

/**
 * CID Behavior:
 * -------------
 * Each time `npm run build` runs, the dist output may change due to:
 *   - Source code modifications
 *   - Dependency version updates causing hash changes in bundled output
 *   - Vite build timestamps or random injected content
 *
 * If the source code has not changed, Vite's cache may produce identical dist
 * files, in which case IPFS returns the same CID (content-addressed storage).
 *
 * The generated CID is saved in the local IPFS repository (~/.ipfs) and is
 * automatically pinned by `ipfs add`, so it will NOT be garbage collected.
 * Use `ipfs pin ls` to list all pinned content.
 *
 * `ipfs name publish` binds the CID to an IPNS name, providing a stable
 * access entry point. When the CID changes on subsequent deploys, simply
 * re-publish to update the IPNS pointer — the IPNS name itself stays the same.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
config({ path: resolve(__dirname, "..", ".env") });

const PROJECT_ROOT = resolve(__dirname, "..");
const DIST_DIR = resolve(PROJECT_ROOT, "dist");

// ANSI color codes
const colors = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    magenta: "\x1b[35m",
    bold: "\x1b[1m",
};

function logInfo(message: string) {
    console.log(`${colors.cyan}[deploy]${colors.reset} ${message}`);
}

function logStep(step: string, message: string) {
    console.log(`\n${colors.magenta}${colors.bold}━━━ ${step} ━━━${colors.reset}`);
    console.log(`${colors.yellow}${message}${colors.reset}`);
}

function logSuccess(message: string) {
    console.log(`${colors.green}${colors.bold}✓${colors.reset} ${colors.green}${message}${colors.reset}`);
}

function logError(message: string) {
    console.error(`${colors.red}${colors.bold}✗ [deploy] ERROR:${colors.reset} ${colors.red}${message}${colors.reset}`);
}

function logHighlight(label: string, value: string) {
    console.log(`  ${colors.bold}${label}:${colors.reset} ${colors.cyan}${value}${colors.reset}`);
}

function runCommand(command: string, cwd: string = PROJECT_ROOT): string {
    logInfo(`Running: ${command}`);
    try {
        const output = execSync(command, {
            cwd,
            encoding: "utf-8",
            stdio: ["pipe", "pipe", "pipe"],
        });
        return output.trim();
    } catch (error: any) {
        const stderr = error.stderr?.trim() || error.message || "Unknown error";
        throw new Error(stderr);
    }
}

async function runCommandAsync(
    command: string,
    cwd: string = PROJECT_ROOT
): Promise<string> {
    logInfo(`Running: ${command}`);
    return new Promise((resolve, reject) => {
        const child = exec(command, { cwd, encoding: "utf-8" }, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(stderr.trim() || error.message));
            } else {
                resolve(stdout.trim());
            }
        });
        // Do NOT pipe output to parent process — we capture it silently
    });
}

async function main() {
    try {
        // Step 1: npm run build
        logStep("Step 1/4", "Building project...");
        runCommand("npm run build");
        logSuccess("Build completed successfully.");

        // Verify dist directory exists
        if (!existsSync(DIST_DIR)) {
            throw new Error(
                `Build output directory "${DIST_DIR}" does not exist. Build may have failed.`
            );
        }

        // Step 2: Upload dist to IPFS and get CID
        logStep("Step 2/4", "Uploading dist to IPFS...");
        const ipfsAddOutput = runCommand(`ipfs add -r "${DIST_DIR}" --cid-version 1 --quieter`);
        const cid = ipfsAddOutput.trim().split("\n").pop() || "";
        if (!cid) {
            throw new Error("Failed to get CID from IPFS add output");
        }
        logSuccess("IPFS upload complete.");
        logHighlight("CID", cid);
        logInfo("This CID is now pinned in the local IPFS repository and will persist.");
        logInfo("If source code hasn't changed, rebuilding may produce the same CID (content addressing).");

        // Step 3: Execute post-deploy script from .env
        // The script is called as: <script> <arg1> <cid>
        // e.g. ipfs_pin.sh 10 <cid>
        // The script's output is captured silently. If the output contains
        // {"Pins":["<cid>"]} (where <cid> is the dynamic dist CID), the step
        // is considered successful. Otherwise the deploy aborts.
        const deployScriptPath = process.env.DEPLOY_SCRIPT_PATH;
        const deployScriptArg1 = process.env.DEPLOY_SCRIPT_ARG1 || "";
        if (deployScriptPath) {
            const absoluteScriptPath = resolve(PROJECT_ROOT, deployScriptPath);
            if (existsSync(absoluteScriptPath)) {
                logStep("Step 3/4", `Executing post-deploy script: ${deployScriptPath} ${deployScriptArg1} ${cid}`);
                const scriptOutput = await runCommandAsync(`"${absoluteScriptPath}" "${deployScriptArg1}" "${cid}"`);
                const expectedResponse = `{"Pins":["${cid}"]}`;
                if (scriptOutput.includes(expectedResponse)) {
                    logSuccess("Post-deploy script executed successfully (received expected pin response).");
                } else {
                    throw new Error(
                        `Post-deploy script did not return the expected pin response. ` +
                        `Expected to find: ${expectedResponse}. Aborting deploy.`
                    );
                }
            } else {
                logError(
                    `Post-deploy script not found at: ${absoluteScriptPath} Skipping.`
                );
            }
        } else {
            logInfo("No DEPLOY_SCRIPT_PATH set in .env. Skipping post-deploy script.");
        }

        // Step 4: Publish CID to IPNS
        const ipnsKeyName = process.env.IPNS_KEY_NAME;
        if (ipnsKeyName) {
            logStep("Step 4/4", `Publishing CID to IPNS key "${ipnsKeyName}"...`);
            const ipnsOutput = runCommand(
                `ipfs name publish --key="${ipnsKeyName}" "${cid}"`
            );
            logSuccess("IPNS publish complete.");
            logHighlight("IPNS output", ipnsOutput);
            logInfo(`IPNS name "${ipnsKeyName}" now points to CID: ${cid}`);
            logInfo("The IPNS name remains stable across deploys; only the underlying CID changes.");
        } else {
            logInfo("No IPNS_KEY_NAME set in .env. Skipping IPNS publish.");
        }

        console.log(`\n${colors.green}${colors.bold}═══════════════════════════════════════${colors.reset}`);
        logSuccess("Deploy completed successfully!");
        console.log(`${colors.green}${colors.bold}═══════════════════════════════════════${colors.reset}\n`);
    } catch (error: any) {
        logError(error.message);
        process.exit(1);
    }
}

main();
