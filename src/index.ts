import { Probot } from 'probot';

export = (app: Probot) => {
  app.on('pull_request.synchronize', async (context) => {
    const issueComment = context.issue({
      body: 'Thanks for improving this PR!',
    });
    await context.octokit.issues.createComment(issueComment);
  });
};
