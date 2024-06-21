import { Hono } from "hono";
import { env } from "hono/adapter";
import postgres from "postgres";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Júlio!");
});

app.get("/listings", async (c) => {
  const DATABASE_URL = c.env.DATABASE_URL;

  // return c.text(DATABASE_URL);

  const sql = postgres(DATABASE_URL, {
    prepare: false,
  });

  const listings = await sql`select * from listings limit 10;`;

  return c.json(listings.map((l) => l.id));
});

export default app;
