import type { CollectionConfig } from "payload";

export const Achivement: CollectionConfig = {
  slug: "achivement",
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*", "video/*", "application/pdf"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "sub-title",
      type: "text",
      required: true,
    },
  ],
};
