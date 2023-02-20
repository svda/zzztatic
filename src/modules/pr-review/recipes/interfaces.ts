import { Context } from 'probot';
import { Changes } from '../actions/get-changes';
import { ReviewComment, ReviewEvent } from '../interfaces';

export type RecipeResult = {
  event: ReviewEvent;
  comments: ReviewComment[];
};

export interface Recipe {
  run: (context: Context, changes: Changes) => Promise<RecipeResult>;
};
