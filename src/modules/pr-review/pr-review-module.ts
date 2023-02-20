import { Context } from 'probot';
import { Maybe } from 'purify-ts';

import { Module } from '../module';
import { createReview } from './actions/create-review';
import { getChanges } from './actions/get-changes';
import { Review, ReviewEvent } from './interfaces';
import { Recipe, RecipeResult } from './recipes/interfaces';

const getEvent = (currentEvent: ReviewEvent, nextEvent: ReviewEvent) => {
  return currentEvent === ReviewEvent.REQUEST_CHANGES || nextEvent === ReviewEvent.REQUEST_CHANGES
    ? ReviewEvent.REQUEST_CHANGES
    : currentEvent === ReviewEvent.APPROVE || nextEvent === ReviewEvent.APPROVE
    ? ReviewEvent.APPROVE
    : ReviewEvent.COMMENT;
};

const toReview = (results: RecipeResult[]): Review =>
  results.reduce(
    (review: Review, recipeResult: RecipeResult) => {
      return {
        event: getEvent(review.event, recipeResult.event),
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

type Config = {
  recipes: Recipe[];
};

const run =
  ({ recipes }: Config) =>
  async (context: Context) => {
    const changes = await getChanges(context).caseOf({
      Left: (error) => {
        throw error;
      },
      Right: (result) => result,
    });

    const results = await Promise.all(recipes.map((recipe) => recipe.run(context, changes)));

    Maybe.of(results).map(toReview).map(createReview(context)).extract();
  };

export const prReviewModule: Module<Config> = {
  register: (app, config) => {
    app.on(
      ['pull_request.opened', 'pull_request.reopened', 'pull_request.edited', 'pull_request.synchronize'],
      run(config)
    );
  },
};
