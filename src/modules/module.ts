import { Probot } from 'probot';

export interface Module<Config> {
  register: (app: Probot, config?: Config) => void;
}
