import type { CollectionConfig } from "payload";

export const Sertif: CollectionConfig = {
  slug: "sertif",
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*", "video/*", "application/pdf"],
  },
  fields: [],
};
