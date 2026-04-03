import { createClient } from "@/lib/supabase/client";
import type { StorageProvider } from "./index";

export class SupabaseStorageProvider implements StorageProvider {
  async upload(bucket: string, path: string, file: File): Promise<string> {
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "bin";
    const uniqueName = `${crypto.randomUUID()}.${ext}`;
    const fullPath = path ? `${path}/${uniqueName}` : uniqueName;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, { upsert: false });

    if (error) {
      throw new Error(`Upload gagal: ${error.message}`);
    }

    return fullPath;
  }

  async delete(bucket: string, path: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      throw new Error(`Hapus file gagal: ${error.message}`);
    }
  }

  getPublicUrl(bucket: string, path: string): string {
    const supabase = createClient();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
