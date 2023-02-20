import { Context } from 'probot';
import { Either, Maybe } from 'purify-ts';
import { changeCodec, Change } from '~/lib/codecs/change-codec';
import { Changes } from '../actions/get-changes';
import { ReviewEvent } from '../interfaces';
import { createLogger } from '../logger';
import { Recipe, RecipeResult } from './interfaces';

const COMMENT = `
  This import references a dist folder. Please be aware imports like this (sometimes) do work, but they can negatively
  impact bundle size because the dist file is not tree shakeable.
`;

const toValidPatches = (changes: Changes) =>
  Either.rights(changes.map(({ patch }) => changeCodec.decode(patch))).filter(({ patch }) => !!patch.length);

const toComments = (changes: Change[]) =>
  changes
    .flatMap(({ filename, patch }) =>
      patch
        .filter(({ lines }) => lines.filter((line) => /^.*$/.test(line)))
        .map((hunks) => ({
          filename,
          hunks,
        }))
    )
    .reduce(
      (comments, { filename, hunks }) => [
        ...comments,
        {
          filename,
          position: hunks.lines[0],
          body: COMMENT,
        },
      ],
      []
    );

const toRecipeResult = (comments) =>
  comments.map((comments) => ({
    event: comments.length ? ReviewEvent.COMMENT : ReviewEvent.APPROVE,
    comments,
  }));

const run = async (context: Context, changes: Changes): Promise<RecipeResult> => {
  const logger = createLogger(context, 'dist-files');
  logger.debug(changes);

  return Maybe.of(changes).map(toValidPatches).map(toComments).map(toRecipeResult).extract();
};

export const distFilesRecipe: Recipe = {
  run,
};
