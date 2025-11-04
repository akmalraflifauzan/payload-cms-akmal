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
    // Untuk koneksi ke Amazon S3 / S3-compatible storage (e.g. Supabase Storage)
    s3Storage({
      // NOTE: collection keys must be the collection SLUG (lowercase 'sertif')
      collections: {
        // Uploads used by the `sertif` collection
        sertif: {
          prefix: "sertif/",
          // If you want files to be publicly accessible without signed URLs,
          // set disablePayloadAccessControl: true
          disablePayloadAccessControl: true,
          signedDownloads: {
            shouldUseSignedURL: ({ collection, filename, req }) => {
              // example: serve signed URL only for video files
              return typeof filename === 'string' && filename.endsWith(".mp4");
            },
          },
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
