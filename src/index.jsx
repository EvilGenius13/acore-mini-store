import { Elysia } from "elysia";
import {html} from "@elysiajs/html";
import IndexPage from "../public/IndexPage";
import SoapClient from "../lib/soapClient";

const app = new Elysia()
  .use(html())
  .get("/", () => {
    return <IndexPage />;
  })
  .post("/send", async (req) => {
    const mail  = new SoapClient(req.body)
    return await mail.sendItem()
  })
  .listen(3000);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
