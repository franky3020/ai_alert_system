import OpenAI from "openai";
import config from "./config";

import { AlertAIAgent } from "./Service/AlertAIAgent";
import { UserAlertMsg } from "./Models/UserAlertMsg";

const openai = new OpenAI({
  apiKey: config.OPEN_AI_API_KEY,
});

const OpenAIModel = "gpt-3.5-turbo-0125";

async function main() {
  const alertAIAgent = new AlertAIAgent();
  alertAIAgent.previewMsg();

  let userAlertMsg = new UserAlertMsg(new Date(), {latitude: 24.228090613811787, longitude: 120.59965642568417}, "user7543", "有狗隨機攻擊路人");
  let report = await alertAIAgent.getRiskAssessmentReport(userAlertMsg);
  report.show();
}

main();
