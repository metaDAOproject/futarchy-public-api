import type {  Selectable } from "kysely";
import { db } from "./db";

export interface TwapTable {
  interv: Date;
  token_amount: number;
  market_acct: string;
  bar_size: string;
}

export type Twap = Selectable<TwapTable>;

export class TwapStore {
  async findByMarketAcct(marketAcct: string, limit: number = 100, cursor?: Date): Promise<Twap[]> {
    let query = db
      .selectFrom("twap_chart_data")
      .selectAll()
      .where("market_acct", "=", marketAcct)
      .orderBy("interv", "asc")
      .limit(limit);

    if (cursor) {
      query = query.where("interv", ">", cursor);
    }

    return await query.execute();
  }

  async findLatestTwap(marketAcct: string, limit: number = 100): Promise<Twap[] | null> {
    return await db
      .selectFrom("twap_chart_data")
      .selectAll()
      .where("market_acct", "=", marketAcct)
      .orderBy("interv", "desc")
      .limit(limit)
      .execute();
  }
}


export const twapStore = new TwapStore();