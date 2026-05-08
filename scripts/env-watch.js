import fs from "fs";
import { exec } from "child_process";

const ENV_FILE = ".env";

console.log("👀 Watching .env for changes...");

fs.watch(ENV_FILE, { persistent: true }, (eventType) => {
  if (eventType === "change") {
    exec("node scripts/env-sync.js", (err) => {
      if (err) {
        console.error("❌ env sync failed");
      } else {
        console.log("✅ .env.example synchronized");
      }
    });
  }
});
