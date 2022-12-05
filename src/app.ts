import { Probot } from 'probot';

import { prReviewModule } from './modules/pr-review/pr-review-module';

export default (app: Probot) => {
  prReviewModule.register(app);
};
