import { Context } from 'probot';
import { ReviewEvent } from '../../interfaces';
import { createLogger } from '../../logger';
import { Recipe, RecipeResult } from '../interfaces';

/**
 * This recipe checks whether the changed files in a PR contain imports to dist files. These are unwanted because they
 * can negatively impact tree-shaking / bundle size, and they are not future proof with regard to ESM.
 */
const run = async (context: Context): Promise<RecipeResult> => {
  const logger = createLogger(context, 'dist-files', {});

  return {
    event: ReviewEvent.APPROVE,
    comments: [],
  };
};

export const distFilesRecipe: Recipe = {
  run,
};
