import * as cors from 'cors';
import * as functions from 'firebase-functions';

export function corsMiddleware() {
  const corsHandler = cors({
    origin: true,
  });

  return (handler: (
    request: functions.https.Request,
    response: functions.Response
  ) => Promise<void>) => {
    return async (
      request: functions.https.Request,
      response: functions.Response
    ) => {
      corsHandler(request, response, () => {
        // Nothing.
      });
      return handler(request, response);
    };
  };
}
