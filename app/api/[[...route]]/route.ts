import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("hello", clerkMiddleware(), (context) => {
	const auth = getAuth(context);
	if (!auth?.userId) {
		return context.json(
			{
				error: "unauthorized",
			},
			401
		);
	}
	return context.json({
		message: "Hello World",
		userId: auth.userId,
	});
});

export const GET = handle(app);
export const POST = handle(app);
