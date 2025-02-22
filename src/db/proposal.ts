import type { Generated, Selectable } from "kysely";

import { db } from "./db";

export interface ProposalDetailsTable {
  proposal_id: Generated<number>;
  title: string | null;
  description: string | null;
  categories: string[] | null;
  content: string | null;
  slug: string | null;
  proposer_acct: string | null;
  proposal_acct: string | null;
  discussion_link: string | null;
  summary: string | null;
  organization_id: number | null;
  state: "draft" | "staged" | "deployed" | null;
}

export interface ProposalTable {
  proposal_acct: string | null;
  proposal_num: number | null;
  autocrat_version: number | null;
  proposer_acct: string | null;
  status: string | null;
  description_url: string | null;
  updated_at: Date | null;
  initial_slot: string | null;
  dao_acct: string | null;
  pricing_model_pass_acct: string | null;
  pricing_model_fail_acct: string | null;
  pass_market_acct: string | null;
  fail_market_acct: string | null;
  base_vault: string | null;
  quote_vault: string | null;
  end_slot: string | null;
  created_at: Date | null;
  ended_at: Date | null;
  completed_at: Date | null;
  duration_in_slots: string | null;
  pass_threshold_bps: number | null;
  twap_initial_observation: string | null;
  min_quote_futarchic_liquidity: string | null;
  min_base_futarchic_liquidity: string | null;
  twap_max_observation_change_per_update: string | null;
}

export type ProposalDetails = Selectable<ProposalDetailsTable>;
export type Proposal = Selectable<ProposalTable>;

// Repository
export class ProposalsStore {

  async findAll(): Promise<(Proposal & ProposalDetails)[]> {
    return await db
      .selectFrom("proposal_details")
      .leftJoin("proposals", "proposals.proposer_acct", "proposal_details.proposer_acct")
      .orderBy("proposals.created_at", "asc")
      .selectAll()
      .execute();
  }

  async findAllActive(): Promise<(Proposal & ProposalDetails)[]> {
    return await db
      .selectFrom("proposal_details")
      .leftJoin("proposals", "proposals.proposer_acct", "proposal_details.proposer_acct")
      .where("proposals.status", "=", "Pending")
      .orderBy("proposals.created_at", "asc")
      .selectAll()
      .execute();
  }
}

export const proposalsStore = new ProposalsStore();
