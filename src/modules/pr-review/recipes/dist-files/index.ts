import { Context, Logger, Probot } from 'probot';
import { createLogger } from '../../logger';
import { Recipe } from '../interfaces';

/**
 * This recipe checks whether the changed files in a PR contain imports to dist files. This is unwanted because it
 * impacts tree-shaking.
 */
const run = async (context: Context): Promise<void> => {
  const logger = createLogger(context, 'dist-files', {});
};

export const distFilesRecipe: Recipe = {
  run,
};
