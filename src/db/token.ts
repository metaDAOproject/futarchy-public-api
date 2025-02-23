import type { Generated, Selectable } from "kysely";

import { db } from "./db";

export interface ApiTokensTable {
  token: string;
  url: string;
}

export type ApiToken = Selectable<ApiTokensTable>;

export class ApiTokensStore {
  async findByToken(token: string): Promise<ApiToken | null> {
    const result = await db
      .selectFrom("api_tokens")
      .where("token", "=", token)
      .select(["token", "url"])
      .executeTakeFirst();

    return result as ApiToken ?? null;
  }

  async findAll(): Promise<ApiToken[]> {
    const results = await db
      .selectFrom("api_tokens")
      .select(["token", "url"])
      .execute();

    return results as ApiToken[];
  }
  
  async create(token: string, url: string = ""): Promise<void> {
    await db
      .insertInto("api_tokens")
      .values({ token: token, url: url })
      .onConflict((oc) => oc.columns(["token"]).doUpdateSet({ url: url }))
      .executeTakeFirstOrThrow();
  }

  async delete(token: string): Promise<void> {
    await db.deleteFrom("api_tokens").where("token", "=", token).execute();
  }
}

export const apiTokensStore = new ApiTokensStore();