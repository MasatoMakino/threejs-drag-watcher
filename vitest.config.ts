import { defineConfig } from "vitest/config";

// The DevContainer sets both to the Debian packages. CI leaves them unset and
// uses the runner's Chrome with a driver that WebdriverIO downloads.
const chromeBinary = process.env.CHROME_BIN;
const chromedriverBinary = process.env.CHROMEDRIVER_BIN;

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      instances: [
        {
          browser: "chrome",
          // Vitest 3 reads the provider options from the instance object.
          capabilities: {
            "goog:chromeOptions": {
              args: [
                // The DevContainer keeps the default seccomp profile, which blocks
                // the user namespaces that the Chromium sandbox needs.
                ...(chromeBinary ? ["--no-sandbox"] : []),
                "--use-gl=angle",
                "--use-angle=swiftshader",
              ],
              ...(chromeBinary && { binary: chromeBinary }),
            },
            ...(chromedriverBinary && {
              "wdio:chromedriverOptions": { binary: chromedriverBinary },
            }),
          },
        },
      ],
      provider: "webdriverio",
      headless: true,
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
