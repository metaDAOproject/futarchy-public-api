import type { Generated, Selectable } from "kysely";
import { db } from "./db";

export interface OrganizationTable {
  organization_id: Generated<number>;
  name: string;
  slug: string;
  url: string;
  image_url: string;
  creator_acct: string;
  admin_accts: JSON;
  is_hide: boolean;
  socials: JSON;
  // Add other fields as necessary
}

export interface DaoDetailsTable {
  dao_id: Generated<number>;
  organization_id: number;
  creator_acct: string;
  dao_acct: string;
  name: string;
  url: string;
  x_account: string;
  github: string;
  description: string;
  slug: string;
  image_url: string;
  admin_accts: JSON;
  token_image_url: string;
  pass_token_image_url: string;
  fail_token_image_url: string;
  lp_token_image_url: string;
  is_hide: boolean;
  is_primary: boolean;
  socials: JSON;
  colors: JSON;
  base_mint: string;
  quote_mint: string;
}


export type Organization = Selectable<OrganizationTable>;


export class OrganizationStore {
  async findAll(): Promise<Organization[]> {
    return await db
      .selectFrom("organizations")
      .where("is_hide", "=", false)
      .selectAll()
      .execute();
  }

  async findById(organizationId: number): Promise<Organization | undefined> {
    const result = await db
      .selectFrom("organizations")
      .selectAll()
      .where("organization_id", "=", organizationId)
      .executeTakeFirst();

    return result;
  }
}

export const organizationStore = new OrganizationStore();
