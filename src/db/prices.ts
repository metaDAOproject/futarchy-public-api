import type {  Selectable } from "kysely";
import { db } from "./db";

export interface PriceTable {
  interv: Date;
  price: number;
  base_amount: number | null;
  quote_amount: number | null;
  prices_type: string;
  market_acct: string;
  bar_size: string;
}

export type Price = Selectable<PriceTable>;

export class PricesStore {
  async findByMarketAcct(
    marketAcct: string,
    limit: number = 100,
    cursor?: Date
  ): Promise<Price[]> {
    let query = db
      .selectFrom("prices_chart_data")
      .selectAll()
      .where("market_acct", "=", marketAcct)
      .orderBy("interv", "asc")
      .limit(limit);

    if (cursor) {
      query = query.where("interv", ">", cursor);
    }

    return await query.execute();
  }

  async findLatestPrices(marketAcct: string, limit: number = 100): Promise<Price[] | null> {
    return await db
      .selectFrom("prices_chart_data")
      .selectAll()
      .where("market_acct", "=", marketAcct)
      .orderBy("interv", "desc")
      .limit(limit)
      .execute();
  }
}

export const pricesStore = new PricesStore();
