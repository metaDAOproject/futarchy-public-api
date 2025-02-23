import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";


import type { OrganizationTable,DaoDetailsTable } from "./organization";
import type { ProposalDetailsTable, ProposalTable } from "./proposal";
import type { PriceTable } from "./prices";
import type { TwapTable } from "./twap";
import type { OrdersTable, TakesTable } from "./trades";
import type { ApiTokensTable } from "./token";
// Database Types
export interface Database {
  proposal_details: ProposalDetailsTable;
  proposals: ProposalTable;
  organizations: OrganizationTable;
  dao_details: DaoDetailsTable;
  prices_chart_data: PriceTable;
  twap_chart_data: TwapTable;
  orders: OrdersTable;
  takes: TakesTable;
  api_tokens: ApiTokensTable;
}

// Database Instance
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: process.env.FUTARCHY_PG_URL
    })
  })
});
