import type { CollectionConfig } from "payload";

export const Achievements: CollectionConfig = {
  slug: "achievements",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "sub-title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "foto sertif",
      type: "upload",
      relationTo: "sertif",
      required: true,
    },
  ],
};
