export interface StorageProvider {
  upload(bucket: string, path: string, file: File): Promise<string>;
  delete(bucket: string, path: string): Promise<void>;
  getPublicUrl(bucket: string, path: string): string;
}

export { SupabaseStorageProvider } from "./supabase";

import { SupabaseStorageProvider } from "./supabase";

const storage: StorageProvider = new SupabaseStorageProvider();
export default storage;
