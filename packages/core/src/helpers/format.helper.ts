export const formatErrWithStack = (err?: Error | null) => {
  if (!err || typeof err != "object") return "Unknown error";

  const stack = err.stack?.split("\n")[1]?.trim();
  return `${err.message} ~ ${stack}`;
};
