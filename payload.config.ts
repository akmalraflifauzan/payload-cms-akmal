import { postgresAdapter } from "@payloadcms/db-postgres";
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { Achievements } from "./src/collection/achivements";
import { Sertif } from "./src/collection/sertif";
import { s3Storage } from "@payloadcms/storage-s3";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Achievements, Sertif],

  // Payload Secret
  secret: process.env.PAYLOAD_SECRET || "",

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
    // Use S3-compatible storage (Supabase exposes an S3-compatible endpoint)
    s3Storage({
      // Map the collection slug for uploads
      collections: {
        sertif: {
          prefix: "sertif/",
          // Make files publicly accessible; set to false if you want signed URLs
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
      bucket: process.env.S3_BUCKET || "",
    }),
  ],
  sharp,
});
