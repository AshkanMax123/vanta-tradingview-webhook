// githubLogger.js
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";
dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const OWNER = "AshkanMax123";
const REPO = "vanta-tradingview-webhook";
const FILE_PATH = "logs/github_alerts.log";

export async function logToGitHub(alertData) {
  try {
    const timestamp = new Date().toISOString();
    const contentToAppend = `[${timestamp}] ${JSON.stringify(alertData)}\n`;

    let sha;
    try {
      const { data } = await octokit.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: FILE_PATH
      });
      sha = data.sha;
    } catch {
      sha = undefined; // File doesn't exist yet
    }

    const encoded = Buffer.from(contentToAppend).toString("base64");

    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: FILE_PATH,
      message: `Auto-log alert at ${timestamp}`,
      content: encoded,
      sha
    });

    console.log("✅ Logged alert to GitHub successfully.");
  } catch (err) {
    console.error("❌ GitHub logging failed:", err.message);
  }
}
