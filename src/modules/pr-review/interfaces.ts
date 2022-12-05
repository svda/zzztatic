export enum ReviewEvent {
  REQUEST_CHANGES = 'REQUEST_CHANGES',
  COMMENT = 'COMMENT',
  APPROVE = 'APPROVE',
}

export type ReviewComment = {
  path: string;
  position: number;
  body: string;
};

export type Review = {
  event: ReviewEvent;
  body: string;
  comments: ReviewComment[];
};
