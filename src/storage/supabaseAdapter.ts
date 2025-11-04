import { createClient } from '@supabase/supabase-js';

// Simple Supabase Storage adapter for Payload uploads.
// This adapter uses the SUPABASE_SERVICE_ROLE_KEY (server-side only).
export const createSupabaseStorageAdapter = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'sertif';

  if (!supabaseUrl || !supabaseKey) {
    // We intentionally do not throw here to allow the app to start in environments
    // where the adapter hasn't been configured yet. Payload will throw at upload time.
    console.warn('Supabase storage adapter not fully configured: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing');
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { fetch },
  });

  return {
    async upload({ file, filename, mimetype }: { file: any; filename: string; mimetype?: string }) {
      // file may be a Buffer, a ReadableStream, or a File-like object depending on env
      let body: Buffer;

      if (Buffer.isBuffer(file)) {
        body = file;
      } else if (file.arrayBuffer) {
        const ab = await file.arrayBuffer();
        body = Buffer.from(ab);
      } else if (typeof file === 'string') {
        body = Buffer.from(file);
      } else {
        // Try to coerce stream-like objects
        body = Buffer.from([]);
      }

      const key = `${Date.now()}-${filename}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(`public/${key}`, body, {
          contentType: mimetype || undefined,
          upsert: false,
        });

      if (uploadError) {
        console.error('Supabase upload error', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(`public/${key}`);

      return {
        filename: key,
        url: data.publicUrl,
      };
    },

    async delete({ filename }: { filename: string }) {
      try {
        const { error } = await supabase.storage.from(bucket).remove([`public/${filename}`]);
        if (error) throw error;
        return true;
      } catch (err) {
        console.error('Supabase delete error', err);
        throw err;
      }
    },
  };
};

export default createSupabaseStorageAdapter;
