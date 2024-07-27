import OpenAI from "openai";
import config from "./config";
import axios from "axios";
import { GoogleSearch } from "./Service/GoogleSearch";

const openai = new OpenAI({
  apiKey: config.OPEN_AI_API_KEY,
});

const OpenAIModel = "gpt-3.5-turbo-0125";

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "你是一位判斷用戶提交安全警報事件的助手, 需要判斷該事件的等級,有三種等級, [最危險級別, 中級別, 低級別], 也需要判斷該事件的可能影響的距離半徑單位為公尺",
      },
      {
        role: "system",
        name: "example_user",
        content:
          '{ "DateTime": "2024-7-25 17:01:55", "position": [120.12431, 23.5483], "IssueEmergencyAlertUserId": "user875424366", "AlertContent": "星星大樓 3樓 窗外出現黑煙"}',
      },
      {
        role: "system",
        name: "example_assistant",
        content:
          '{"level": "最危險級別", "distanceRadiusOfInfluence": "30m", "basisOfJudgment": "因為社區大樓的黑煙通常表明可能存在火災或其他危險, 但未明確看到火光或有無爆炸, 影響範圍較小, 需要對周圍30公尺範圍內進行警戒"}',
      },
      {
        role: "user",
        content:
          '{ "DateTime": "2024-7-27 17:01:55", "position": [121.12431, 24.5483], "IssueEmergencyAlertUserId": "user8754134366", "AlertContent": "明泉路與文心路出現機車與機車擦撞車禍"}',
      },
    ],
    model: OpenAIModel,
  });
  console.log(completion);
  console.log(completion.choices[0]);
}

main();
