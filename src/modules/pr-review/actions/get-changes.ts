import { EitherAsync } from 'purify-ts';
import { Endpoints } from '@octokit/types';
import { Context } from 'probot';

export type Changes = Endpoints['GET /repos/{owner}/{repo}/pulls/{pull_number}/files']['response']['data'];

export const getChanges = (context: Context): EitherAsync<Error, Changes> =>
  EitherAsync(async () => {
    const pullRequest = context.pullRequest();
    return context.octokit.pulls.listFiles(pullRequest);
  })
    .mapLeft((error) => new ActionError(`Unable to get changes: [${error}]`))
    .map((response) => response.data);
