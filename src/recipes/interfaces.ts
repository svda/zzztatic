import { Probot } from 'probot';

export type Recipe = {
  register: (app: Probot) => void;
};
