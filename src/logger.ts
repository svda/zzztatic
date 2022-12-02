import { Context } from 'probot';

export const createLogger = <T extends Record<string, any>>(context: Context, fields: T) =>
  context.log.child({
    app: 'probot-add-comment',
    ...fields,
  });
