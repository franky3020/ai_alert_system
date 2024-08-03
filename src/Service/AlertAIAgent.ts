import { ChatCompletionMessageParam } from "openai/resources/chat";
import { RiskAssessmentReport } from "../Models/RiskAssessmentReport";
import config from "../config";
import OpenAI from "openai";
import { UserAlertMsg } from "../Models/UserAlertMsg";

export class AlertAIAgent {
  messages: Array<ChatCompletionMessageParam> = [];

  constructor() {
    const exampleAlert = new UserAlertMsg(new Date("2021-07-27T18:24:00"), {latitude: 24.17129297887858, longitude: 120.59929167921332}, "user123", "商場內發現可疑包裹, 且外型像是炸彈");

    const exampleReport = new RiskAssessmentReport (
        'highest_risk_level',
        '50m',
        '因為商場內發現可疑包裹, 外型像是炸彈, 考慮到潛在爆炸威脅及影響範圍, 需要對周圍50公尺範圍內進行疏散和警戒'
    );

    let promptMsg: ChatCompletionMessageParam = {
        role: "system",
        content: '你是一位判斷用戶提交安全警報事件的助手, 需要判斷該事件的等級,有三種等級, ["highest_risk_level", "medium_risk_level,", "low_risk_level"], 也需要判斷該事件的可能影響的距離半徑單位為公尺,\n' +
        '並且輸出 判斷依據在 basisOfJudgment 欄位中. \n' +
        '使用者輸入範例為: ' + exampleAlert.toJson() + '\n' +
        '則你需要的回復格式為:' + exampleReport.toJson() + '\n' +
        '以下為判斷參考依據: \n' +
        '火災 視為 highest_risk_level\n'
    }

    this.messages.push(promptMsg);

    const exampleAlert1 = new UserAlertMsg(new Date("2021-07-27T19:13:00"), {latitude: 24.257829981245745, longitude: 120.51848204285801}, "user777", "星星大樓 3樓 窗外出現黑煙");
    this.messages.push({
        role: "system",
        name: "example_user",
        content: exampleAlert1.toJson()
    });

    const exampleReport1 = new RiskAssessmentReport(
        'highest_risk_level',
        '30m',
        '因為社區大樓的黑煙通常表明可能存在火災或其他危險, 但未明確看到火光或有無爆炸, 影響範圍較小, 需要對周圍30公尺範圍內進行警戒',
    );
    this.messages.push({
        role: "system",
        name: "example_assistant",
        content: exampleReport1.toJson()
    });
  }

  previewMsg() {
    console.log(this.messages);
  }


  async getRiskAssessmentReport(userAlertMsg: UserAlertMsg): Promise<RiskAssessmentReport> {
    const openai = new OpenAI({
      apiKey: config.OPEN_AI_API_KEY,
    });

    this.messages.push({
        role: "user",
        content: userAlertMsg.toJson()
    });


    const OpenAIModel = "gpt-3.5-turbo-0125";


    const completion = await openai.chat.completions.create({
      messages: this.messages,
      model: OpenAIModel,
    });

    // TODO: 需要檢查格式有無正確
    let resuleMsg = completion.choices[0].message.content;
    if (resuleMsg != null) {
      let riskAssessmentReport: RiskAssessmentReport = JSON.parse(
        resuleMsg
      );
      return new RiskAssessmentReport(riskAssessmentReport.level, riskAssessmentReport.distanceRadiusOfInfluence, riskAssessmentReport.basisOfJudgment);
    }

    throw new Error("error");
  }
}
