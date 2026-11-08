import { app } from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

let isShuttingDown = false;

function gracefulShutdown(signal: string) {
  if (isShuttingDown) {
    console.log("Shutdown already in progress");
    return;
  }

  isShuttingDown = true;

  console.log(`${signal} received. Shutting down...`);

  // Stop accepting new connections and wait
  // for active requests to finish.
  server.close((error) => {
    if (error) {
      console.error("HTTP server shutdown failed:", error);
      process.exitCode = 1;
      return;
    }

    console.log("HTTP server closed successfully");
    process.exitCode = 0;
  });
}

process.on("SIGINT", () => {
  gracefulShutdown("SIGINT");
});

process.on("SIGTERM", () => {
  gracefulShutdown("SIGTERM");
});

// *** NOTE For the Production We will use this ***

// function gracefulShutdown(signal: string) {
//   if (isShuttingDown) return;

//   isShuttingDown = true;

//   console.log(`${signal} received. Shutting down...`);

//   const forceShutdownTimer = setTimeout(() => {
//     console.error("Shutdown timeout exceeded");
//     server.closeAllConnections();
//     process.exitCode = 1;
//   }, 10_000);

//   forceShutdownTimer.unref();

//   server.close((error) => {
//     clearTimeout(forceShutdownTimer);

//     if (error) {
//       console.error("Failed to close server:", error);
//       process.exitCode = 1;
//       return;
//     }

//     console.log("HTTP server closed successfully");
//     process.exitCode = 0;
//   });
// }
