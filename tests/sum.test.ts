import { describe, expect, test } from "@jest/globals";

import { UserAlertMsg } from "../src/Models/UserAlertMsg";

test("adds 1 + 2 to equal 3", async () => {
  expect(3).toBe(3);
});

test("tojson", async () => {

  let userAlertMsg = new UserAlertMsg(new Date(), {latitude: 12.05413, longitude: 54}, "franky", "有危險");
  console.log(userAlertMsg.toJson());
  expect(3).toBe(3);
});


test("jsonPrase", () => {

  interface Message {
    message: string,
    level: number,
    otherMsg: string
  }

  let message: Message = JSON.parse(
    '{"message": "good"}'
  );

  expect(message.message).toBe("good");
  expect(message.level).toBe(undefined);
  expect(message.otherMsg).toBe(undefined);
  expect(Object.keys(message).length).toBe(1);
})

