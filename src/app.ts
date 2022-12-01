import { Probot } from 'probot';

export = (app: Probot) => {
  app.on(
    ['pull_request.opened', 'pull_request.reopened', 'pull_request.edited', 'pull_request.synchronize'],
    async (context) => {
      const owner = context.issue().owner;
      const repo = context.issue().repo;
      const issue_number = context.issue().issue_number;
      console.log(owner, repo, issue_number);
      const comment = context.issue({
        owner,
        repo,
        issue_number,
        body: 'Thanks for improving this PR!',
      });
      await context.octokit.issues.createComment(comment);
      context.log.info(`Comment created [${issue_number}]`);
    }
  );
};
