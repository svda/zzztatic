import { Probot } from 'probot';

export interface Module {
  register: (app: Probot) => void;
}
