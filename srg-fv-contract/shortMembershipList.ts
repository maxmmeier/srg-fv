import { ShortMembership } from "./shortMembership";

export interface ShortMembershipList {
  memberships: ShortMembership[];
  currentPage: number;
  maxPage: number;
}
