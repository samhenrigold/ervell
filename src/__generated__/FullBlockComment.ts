/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FullBlockComment
// ====================================================

export interface FullBlockComment_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface FullBlockComment_can {
  __typename: "CommentCan";
  destroy: boolean | null;
}

export interface FullBlockComment {
  __typename: "Comment";
  id: number;
  body: string | null;
  created_at: string | null;
  user: FullBlockComment_user | null;
  can: FullBlockComment_can | null;
}