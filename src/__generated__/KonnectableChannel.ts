/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableChannel
// ====================================================

export interface KonnectableChannel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface KonnectableChannel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface KonnectableChannel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type KonnectableChannel_owner = KonnectableChannel_owner_Group | KonnectableChannel_owner_User;

export interface KonnectableChannel {
  __typename: "Channel";
  id: number;
  href: string | null;
  truncatedTitle: string;
  visibility: string;
  updated_at: string | null;
  counts: KonnectableChannel_counts | null;
  owner: KonnectableChannel_owner;
  label: string;
}
