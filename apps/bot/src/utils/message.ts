import {
  BotMessageEvent,
  FileShareMessageEvent,
  GenericMessageEvent,
  ThreadBroadcastMessageEvent,
} from 'slack-cloudflare-workers';

type MessagePayload =
  | GenericMessageEvent
  | BotMessageEvent
  | FileShareMessageEvent
  | ThreadBroadcastMessageEvent;

export const messageIsFromThread = (payload: MessagePayload) =>
  payload.thread_ts !== undefined;

export const messageIsDirectMessage = (payload: MessagePayload) =>
  payload.channel.startsWith('D') || payload.channel_type === 'im';
