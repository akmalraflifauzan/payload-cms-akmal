import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { Achievements } from "./src/collection/achivements";
import { Sertif } from "./src/collection/sertif";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Achievements, Sertif],

  // Payload Secret
  secret: process.env.PAYLOAD_SECRET || "",

  // Server URL for generating admin URLs
  serverURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  // Untuk koneksi ke Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true,
        ca: process.env.SSL_CA,
      },
    },
  }),
  plugins: [
    // Untuk koneksi ke Amazon S3 / S3-compatible storage (e.g. Supabase Storage)
    s3Storage({
      collections: {
        Achievements: {
          prefix: "achievements/",
          // Disable signed downloads for public access
          disablePayloadAccessControl: true,
        },
      },
      config: {
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "",
        forcePathStyle: true,
      },
      bucket: process.env.S3_BUCKET || "merah",
    }),
  ],
  sharp,
});
