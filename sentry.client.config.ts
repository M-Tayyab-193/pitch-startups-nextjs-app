import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7dd65afce6ae123890e515ceb0c6dff3@o4509820971909120.ingest.us.sentry.io/4509820976037888",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});