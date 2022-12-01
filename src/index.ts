import Actions from '@probot/adapter-github-actions';
import app from './app';

global.FinalizationRegistry =
  global.FinalizationRegistry ||
  class FakeFinalizationRegistry {
    register() {}

    unregister() {}
  };

Actions.run(app);
