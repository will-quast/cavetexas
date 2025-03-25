export interface DatabaseColumn {
  name: string;
  type: string;
  is_nullable: "YES" | "NO";
  column_default: string | null;
}

export interface TableSchema {
  table_name: string;
  columns: DatabaseColumn[];
}

export interface DatabaseSchema {
  version: string;
  last_updated: string;
  tables: TableSchema[];
}

// Define your table schemas here for type checking
export interface MembersTable {
  id: number;
  user_id: string;
  created_at: string;
  status: "member" | "nonmember";
  expires: string;
}

// Add more table interfaces as needed
