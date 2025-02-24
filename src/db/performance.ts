import type { Generated, Selectable } from "kysely";

import { db } from "./db";

export interface PerformanceTable {
  proposal_acct: string;
  user_acct: string;
  tokens_bought: number;
  tokens_sold: number;
  volume_bought: number;
  volume_sold: number;
  created_at: Date;
  updated_at: Date;
  dao_acct: string;
  tokens_bought_resolving_market: number;
  tokens_sold_resolving_market: number;
  volume_bought_resolving_market: number;
  volume_sold_resolving_market: number;
  buy_orders_count: number;
  sell_orders_count: number;
  total_volume: number;
}

export type UserPerformance = Selectable<PerformanceTable>;

// Repository
export class PerformanceStore {

  async findByUser(userAcct: string): Promise<UserPerformance[]> {
    return await db
      .selectFrom("user_performance")
      .where("user_acct", "=", userAcct)
      .orderBy("created_at", "asc")
      .selectAll()
      .execute();
  }

  async findAll(): Promise<UserPerformance[]> {
    return await db
      .selectFrom("user_performance")
      .orderBy("created_at", "asc")
      .selectAll()
      .execute();
  }
}

export const performanceStore = new PerformanceStore();
