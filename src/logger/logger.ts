import { pino } from "pino";

const TELEGRAM_ALERT_CHAT_ID = process.env.TELEGRAM_ALERT_CHAT_ID ?? "";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DEPLOY_ENVIRONMENT = process.env.DEPLOY_ENVIRONMENT ?? "STAGING";
const LOG_LEVEL = process.env.LOG_LEVEL ?? "error";

const transports = [];
const telegramTransport = {
  target: "pino-telegram-webhook",
  level: "error",

  options: {
    chatId: TELEGRAM_ALERT_CHAT_ID,
    botToken: TELEGRAM_BOT_TOKEN,
    verbose: true,
    extra: {
      parse_mode: "MarkdownV2"
    },
    ignore: "pid,hostname",
    timestamp: true
  }
};
const prettyTransport = {
  target: "pino-pretty",
  level: LOG_LEVEL,
  options: {
    colorize: true,
    ignore: "pid,hostname",
    timestamp: true,
    singleLine: true,
    sync: true
  }
};
let level = LOG_LEVEL;
if (DEPLOY_ENVIRONMENT === "PROD" || DEPLOY_ENVIRONMENT === "STAGING") {
  transports.push(telegramTransport);
  transports.push(prettyTransport);
} else {
  level = "debug";
  transports.push(prettyTransport);
}
export const log: pino.Logger = pino(
  {
    name: "API Server",
    level: level,
    transport: {
      targets: transports
    }
  },
  pino.destination({
    sync: true
  })
);
