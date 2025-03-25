const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

interface TableDefinition {
  table_name: string;
}

interface ColumnDefinition {
  column_name: string;
  data_type: string;
  is_nullable: "YES" | "NO";
  column_default: string | null;
}

interface SchemaTable {
  table_name: string;
  columns: {
    name: string;
    type: string;
    is_nullable: "YES" | "NO";
    column_default: string | null;
  }[];
}

interface DatabaseSchema {
  version: string;
  last_updated: string;
  tables: SchemaTable[];
}

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchSchemas() {
  try {
    // Fetch table definitions
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("*")
      .eq("table_schema", "public");

    if (tablesError) throw tablesError;

    // Fetch column definitions for each table
    const schemas = await Promise.all(
      (tables as TableDefinition[]).map(async (table) => {
        const { data: columns, error: columnsError } = await supabase
          .from("information_schema.columns")
          .select("*")
          .eq("table_schema", "public")
          .eq("table_name", table.table_name);

        if (columnsError) throw columnsError;

        return {
          table_name: table.table_name,
          columns: (columns as ColumnDefinition[]).map((col) => ({
            name: col.column_name,
            type: col.data_type,
            is_nullable: col.is_nullable,
            column_default: col.column_default,
          })),
        };
      })
    );

    // Create schemas directory if it doesn't exist
    const schemasDir = path.join(process.cwd(), "src/db/schemas");
    if (!fs.existsSync(schemasDir)) {
      fs.mkdirSync(schemasDir, { recursive: true });
    }

    const schemaData: DatabaseSchema = {
      version: "1.0",
      last_updated: new Date().toISOString(),
      tables: schemas,
    };

    // Write schemas to file
    fs.writeFileSync(
      path.join(schemasDir, "db-schema.json"),
      JSON.stringify(schemaData, null, 2)
    );

    console.log("Successfully fetched and saved database schemas");
  } catch (error) {
    console.error("Error fetching schemas:", error);
    process.exit(1);
  }
}

fetchSchemas();
