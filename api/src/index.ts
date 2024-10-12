import { EmailMessage } from "cloudflare:email";
import { Hono } from "hono";
import { createMimeMessage } from "mimetext";

type App = {
  Bindings: {
    Email: SendEmail;
    Recipient: string;
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

  // const msg = createMimeMessage();

  // msg.setSender({ name: body.name, addr: body.email });
  // msg.setRecipient(c.env.Recipient);
  // msg.setSubject("An email generated in a worker");
  // msg.addMessage({
  //   contentType: "text/plain",
  //   data: `Congratulations, you just sent an email from a worker.`,
  // });

  // var message = new EmailMessage(body.email, c.env.Recipient, msg.asRaw());

  // try {
  //   await c.env.Email.send(message);
  // } catch (e) {
  //   if (e instanceof Error) {
  //     return new Response(e.message);
  //   }

  //   return new Response("Internal Server Error");
  // }
});

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<App["Bindings"]>;
