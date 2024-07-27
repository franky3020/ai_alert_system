import OpenAI from "openai";
import config from "./config";

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
          '你是一位判斷用戶提交安全警報事件的助手, 需要判斷該事件的等級,有三種等級, ["highest_risk_level", "medium_risk_level,", "low_risk_level"], 也需要判斷該事件的可能影響的距離半徑單位為公尺, \n\
          使用者輸入範例為 : { "DateTime": "2024-7-27 18:01:00", "position": [121.124131, 24.5154483], "IssueEmergencyAlertUserId": "user8754313166", "AlertContent": "商場內發現可疑包裹, 且外型像是炸彈"} \n\
          則你需要的回復格式為 {"level": "highest_risk_level", "distanceRadiusOfInfluence": "50m", "basisOfJudgment": "因為商場內發現可疑包裹, 外型像是炸彈, 考慮到潛在爆炸威脅及影響範圍, 需要對周圍50公尺範圍內進行疏散和警戒"} \n\
          以下為判斷參考依據: \n\
          火災 視為 highest_risk_level \n\
          ',
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
          '{"level": "highest_risk_level", "distanceRadiusOfInfluence": "30m", "basisOfJudgment": "因為社區大樓的黑煙通常表明可能存在火災或其他危險, 但未明確看到火光或有無爆炸, 影響範圍較小, 需要對周圍30公尺範圍內進行警戒"}',
      },
      {
        role: "system",
        name: "example_user",
        content:
          '{ "DateTime": "2024-7-27 17:01:55", "position": [121.12431, 24.5483], "IssueEmergencyAlertUserId": "user8754134366", "AlertContent": "公益路與文心路出現機車與機車擦撞車禍"}',
      },
      {
        role: "system",
        name: "example_assistant",
        content: '{"level": "low_risk_level", "distanceRadiusOfInfluence": "10m", "basisOfJudgment": "據位置上的機車相撞車禍推斷, 造成的傷害及損害範圍較為有限, 應該現場處理並警戒10公尺範圍內"}'
      },
      {
        role: "system",
        name: "example_user",
        content: '{ "DateTime": "2024-7-27 18:01:00", "position": [121.124131, 24.5154483], "IssueEmergencyAlertUserId": "user8754313166", "AlertContent": "商場內發現可疑包裹, 且外型像是炸彈"}',
      },
      {
        role: "system",
        name: "example_assistant",
        content: '{"level": "highest_risk_level", "distanceRadiusOfInfluence": "50m", "basisOfJudgment": "因為商場內發現可疑包裹, 外型像是炸彈, 考慮到潛在爆炸威脅及影響範圍, 需要對周圍50公尺範圍內進行疏散和警戒"}'
      },
      {
        role: "user",
        content: '{ "DateTime": "2024-7-27 18:31:46", "position": [122.16431, 25.514312483], "IssueEmergencyAlertUserId": "user111146131166", "AlertContent": "至善大樓2樓出現大火"}'
      }
    ],
    model: OpenAIModel,
  });
  console.log(completion);
  console.log(completion.choices[0]);
}

main();
