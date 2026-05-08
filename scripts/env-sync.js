import fs from "fs";

const ENV_FILE = ".env";
const EXAMPLE_FILE = ".env.example";

if (!fs.existsSync(ENV_FILE)) {
  console.error("❌ .env file not found");
  process.exit(1);
}

const env = fs.readFileSync(ENV_FILE, "utf8");

const result = env
  .split("\n")
  .map((line) => {
    const trimmed = line.trim();

    // зберігаємо порожні рядки
    if (trimmed === "") return "";

    // зберігаємо коментарі
    if (trimmed.startsWith("#")) return line;

    // обробляємо KEY=VALUE
    const index = trimmed.indexOf("=");
    if (index === -1) return "";

    const key = trimmed.slice(0, index).trim();
    if (!key) return "";

    return `${key}=`;
  })
  .join("\n");

fs.writeFileSync(EXAMPLE_FILE, result + "\n");

console.log("✅ .env.example synchronized with .env");
