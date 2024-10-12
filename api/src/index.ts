import { EmailMessage } from "cloudflare:email";
import { Hono } from "hono";
import { createMimeMessage } from "mimetext";

type App = {
  Bindings: {
    SEB: SendEmail;
    RECIPIENT: string;
  };
};

type Body = {
  name: string;
  email: string;
  message: string;
};

const app = new Hono<App>();

app.post("/", async (c) => {
  const body = await c.req.parseBody<Body>();

  const msg = createMimeMessage();

  msg.setSender({ name: "Formsubmit Worker", addr: "formsubmit@mailoom.com" });
  msg.setRecipient({ name: "Sakib Hasan", addr: "shakibhasan.me09@gmail.com" });
  msg.setSubject("An email generated in a worker");
  msg.addMessage({
    contentType: "text/plain",
    data: `Congratulations, you just sent an email from a worker.`,
  });

  var message = new EmailMessage(
    "formsubmit@mailoom.com",
    "shakibhasan.me09@gmail.com",
    msg.asRaw()
  );

  try {
    console.log(c.env.SEB);
    await c.env.SEB.send(message);
  } catch (e) {
    return new Response((e as Error).message);
  }
});

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<App["Bindings"]>;
