import { Probot } from 'probot';

export default (app: Probot) => {
  app.on('issues.opened', async (context) => {
    return context.octokit.issues.createComment(context.issue({ body: 'Hello, World!' }));
  });
};
