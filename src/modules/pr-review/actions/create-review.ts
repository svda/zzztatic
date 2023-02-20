import { Context } from 'probot';
import { curry } from 'purify-ts';
import { Review } from '../interfaces';

export const createReview = curry(async (context: Context, review: Review): Promise<void> => {
  const pullRequest = context.pullRequest();

  await context.octokit.rest.pulls.createReview({
    ...pullRequest,
    ...review,
  });
});
