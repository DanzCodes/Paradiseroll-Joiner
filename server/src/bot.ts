// @ts-nocheck
import User, { IAccount } from "./models/user.model";
import puppeteer, { Page } from "puppeteer";

let accounts: IAccount[] = [];

const main = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const response = await page.goto("https://paradiseroll.com/");
  if (!response.ok) throw new Error("Cannot connect to ParadiseRoll");

  page.on("response", async (response) => {
    if (response.url().includes("?roparadise")) {
      if (response.request().method() === "OPTIONS") return;

      const params = new RegExp(/\?([a-zA-Z0-9_-]+)=([^&]+)/g).exec(
        response.url()
      );
      const responseBody = await response.json();
      const accountId = params[2];

      if (!response.ok() && responseBody.message) {
        const user = await User.findOne({
          "accounts._id": accountId,
        });

        const accountIndex = user.accounts.findIndex(
          (account) => account._id.toString() === accountId
        );
        user.accounts[accountIndex].errorMessage = responseBody.message;
        user.accounts[accountIndex].isActive = false;
        await user.save();
        return;
      }

      if (!response.url().endsWith("?roparadise=01111000")) {
        if (response.ok()) {
          const user = await User.findOne({
            "accounts._id": accountId,
          });

          const accountIndex = user.accounts.findIndex(
            (account) => account._id.toString() === accountId
          );
          user.accounts[accountIndex].joinedTimes =
            user.accounts[accountIndex].joinedTimes + 1;

          await user.save();
          return 1;
        }
      }
    }
  });

  accounts = await getAllAccounts();
  const sessionId = await getSession(page);
  accounts.forEach((account) => joinRain(account, sessionId, page));

  setTimeout(async () => { await init(page) }, 32 * 60);
};

const init = async (page: Page) => {
  accounts = await getAllAccounts();
  const sessionId = await getSession(page);
  accounts.forEach((account) => joinRain(account, sessionId, page));
};

const getSession = async (page: Page): Promise<string | undefined> => {
  const value = await page.evaluate(async () => {
    const res = await fetch(
      "https://api.paradiseroll.com/v1/games/rain/current-session?roparadise=01111000"
    );
    const data = await res.json();
    return data;
  });

  return value.data.session._id;
};

const getAllAccounts = async (): Promise<IAccount[] | []> => {
  try {
    const accounts = await User.aggregate([
      {
        $unwind: "$accounts",
      },
      {
        $match: {
          "accounts.isActive": true,
        },
      },
      {
        $group: {
          _id: null,
          accounts: {
            $push: "$accounts",
          },
        },
      },
    ]);

    if (accounts.length > 0) return accounts[0].accounts;
    else return [];
  } catch (err) {
    console.error(err);
  }
};

const joinRain = async (account: IAccount, sessionId: string, page: Page) => {
  await page.evaluate(
    (account, sessionId) => {
      grecaptcha.ready(function () {
        grecaptcha
          .execute("6LcaZtAnAAAAAA4xPrFswiOYmNsowOwIUcKTPR43", {
            action: "joinRain",
          })
          .then(async (code) => {
            await fetch(
              `https://api.paradiseroll.com/v1/games/rain/sessions/${sessionId}/join?roparadise=${account._id.toString()}`,
              {
                method: "POST",
                headers: {
                  accept: "application/json, text/plain, */*",
                  "content-type": "application/json",
                  "x-authorization": `Bearer ${account.tokenCookie}`,
                },
                body: JSON.stringify({ captchaToken: code }),
                method: "POST",
              }
            );
          });
      });
    },
    account,
    sessionId
  );
};

export default main;
