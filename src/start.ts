import {
  createStart,
  createCsrfMiddleware,
  createMiddleware,
} from "@tanstack/react-start";

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    console.error("Server error:", error);
    throw error;
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [
    errorMiddleware,
    csrfMiddleware,
  ],
}));