import { Context } from 'probot';

export const createLogger = <T extends Record<string, any>>(context: Context, recipe: string, fields?: T) =>
  context.log.child({
    recipe,
    pr: context.issue().issue_number,
    ...fields,
  });
