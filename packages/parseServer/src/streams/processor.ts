/* eslint-disable @typescript-eslint/no-explicit-any */
import { webhookRouter } from './webbhook';

interface StreamOptions {
  parseInstance: any;
  webhookUrl: string;
}

export const parseServerStreamsSync = ({ parseInstance, webhookUrl }: StreamOptions) =>
  webhookRouter(parseInstance, webhookUrl);
