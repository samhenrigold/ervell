/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadataInfo
// ====================================================

export interface ProfileMetadataInfo_User_counts {
  __typename: "UserCounts";
  followers: number;
  following: number;
  groups: number | null;
}

export interface ProfileMetadataInfo_User {
  __typename: "User";
  href: string | null;
  about: string | null;
  counts: ProfileMetadataInfo_User_counts | null;
}

export interface ProfileMetadataInfo_Group_user {
  __typename: "User";
  name: string;
  href: string | null;
}

export interface ProfileMetadataInfo_Group_counts {
  __typename: "GroupCounts";
  followers: number;
}

export interface ProfileMetadataInfo_Group {
  __typename: "Group";
  href: string | null;
  about: string | null;
  user: ProfileMetadataInfo_Group_user;
  counts: ProfileMetadataInfo_Group_counts | null;
}

export type ProfileMetadataInfo = ProfileMetadataInfo_User | ProfileMetadataInfo_Group;
