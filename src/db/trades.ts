import type {  Selectable } from "kysely";
import { db } from "./db";

export interface OrdersTable {
  order_tx_sig: string | null;
  market_acct: string | null;
  actor_acct: string;
  side: string;
  updated_at: Date;
  filled_base_amount: number;
  quote_price: number | null;
}

export interface TakesTable {
  order_tx_sig: string | null;
  base_amount: number | null;
  quote_price: number | null;
  taker_base_fee: bigint;
  maker_quote_fee: bigint | null;
  maker_order_tx_sig: string | null;
  maker_base_fee: bigint | null;
  market_acct: string | null;
  order_block: number;
  order_time: Date;
  taker_quote_fee: bigint;
  take_id: string;
  base_decimals: number | null;
  quote_decimals: number | null;
}

export type Order = Selectable<OrdersTable>;
export type Take = Selectable<TakesTable>;

// Add a new interface for the joined result
export interface OrderWithTakes {
  order: Order;
  takes: Take[];
}

export class TradesStore {
  async findByMarketAcct(marketAcct: string, limit: number = 100, cursor?: Date): Promise<OrderWithTakes[]> {
   let query = db
      .selectFrom("orders")
      .leftJoin("takes", "orders.order_tx_sig", "takes.order_tx_sig")
      .select([
        'orders.order_tx_sig as order_tx_sig',
        'orders.market_acct as order_market_acct',
        'orders.actor_acct',
        'orders.side',
        'orders.updated_at',
        'orders.filled_base_amount',
        'orders.quote_price as order_quote_price',
        'takes.take_id',
        'takes.base_amount as take_base_amount',
        'takes.quote_price as take_quote_price',
        'takes.taker_base_fee',
        'takes.maker_quote_fee',
        'takes.maker_order_tx_sig',
        'takes.maker_base_fee',
        'takes.market_acct',
        'takes.order_block',
        'takes.order_time',
        'takes.taker_quote_fee',
        'takes.base_decimals',
        'takes.quote_decimals',
        // ... other take fields you need
      ])
      .where("orders.market_acct", "=", marketAcct)
      .orderBy("orders.updated_at", "desc")
      .limit(limit)

      if (cursor) {
        query = query.where("orders.updated_at", "<", cursor)
      }

    const results = await query.execute();

    // Group the results by order
    const ordersMap = new Map<string, OrderWithTakes>();
    
    for (const row of results) {
      const orderKey = row.order_tx_sig ?? '';
      if (!ordersMap.has(orderKey)) {
        ordersMap.set(orderKey, {
          order: {
            order_tx_sig: row.order_tx_sig ?? '',
            market_acct: row.order_market_acct ?? '',
            actor_acct: row.actor_acct,
            side: row.side,
            updated_at: row.updated_at,
            filled_base_amount: row.filled_base_amount,
            quote_price: row.order_quote_price ?? 0,
          },
          takes: []
        });
      }
      
      if (row.take_id) {  // Only add take if it exists
        ordersMap.get(orderKey)!.takes.push({
          take_id: row.take_id,
          base_amount: row.take_base_amount ?? 0,
          quote_price: row.take_quote_price ?? 0,
          taker_base_fee: row.taker_base_fee ?? 0,
          maker_quote_fee: row.maker_quote_fee ?? 0,
          maker_order_tx_sig: row.maker_order_tx_sig ?? '',
          maker_base_fee: row.maker_base_fee ?? 0,
          market_acct: row.market_acct ?? '',
          order_block: row.order_block ?? 0,
          order_time: row.order_time ?? new Date(),
          taker_quote_fee: row.taker_quote_fee ?? 0,
          base_decimals: row.base_decimals ?? 0,
          quote_decimals: row.quote_decimals ?? 0,
        } as Take);
      }
    }

    return Array.from(ordersMap.values());
  }
}

export const tradesStore = new TradesStore();
