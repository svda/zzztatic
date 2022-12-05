import { Context, Probot } from 'probot';
import { Module } from '../interfaces';
import { Recipe } from './recipes/interfaces';

import { distFilesRecipe } from './recipes/dist-files';
import { Maybe } from 'purify-ts';
import { Review, ReviewEvent } from './interfaces';

const getChanges = async (context: Context) => {
  const response = await context.octokit.pulls.listFiles();

  return Maybe.of(response)
    .map((response) => response.data)
    .map((files) => files.map(({ filename, status, additions, deletions, changes }) => filename))
    .extract();
};

const getNewEvent = (currentEvent: ReviewEvent, nextEvent: ReviewEvent) => {
  return ReviewEvent.COMMENT;
};

const toReview = (results): Review =>
  results.reduce(
    (review, recipeResult) => {
      return {
        event: getNewEvent(review.event, recipeResult.event),
        body: `${review.body}\n${recipeResult.comments}`,
        comments: [...review.comments, ...recipeResult.comments],
      };
    },
    {
      event: ReviewEvent.COMMENT,
      body: 'Hey! I created some comments on your PR. I hope they are of any use ;)',
      comments: [],
    }
  );

const createReview = async (context: Context, review: Review): Promise<void> => {
  const pullRequest = context.pullRequest();

  await context.octokit.rest.pulls.createReview({
    ...pullRequest,
    ...review,
  });
};

const run = async (context: Context) => {
  const changes = getChanges(context);
  const results = await Promise.all(recipes.map((recipe) => recipe.run(context, changes)));

  const review = Maybe.of(results).map(toReview).extract();

  return createReview(context, review);
};

const recipes: Recipe[] = [distFilesRecipe];

export const prReviewModule: Module = {
  register: (app: Probot) => {
    app.on(['pull_request.opened', 'pull_request.reopened', 'pull_request.edited', 'pull_request.synchronize'], run);
  },
};
