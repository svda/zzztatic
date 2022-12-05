import { Context } from 'probot';
import { ReviewComment, ReviewEvent } from '../interfaces';

export type RecipeResult = {
  event: ReviewEvent;
  comments: ReviewComment[];
};

export interface Recipe {
  run: (context: Context, changes: any) => Promise<RecipeResult>;
};
