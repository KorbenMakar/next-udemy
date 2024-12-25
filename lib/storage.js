import { supabase } from './supabase';

export async function uploadImage(file) {
    const fileName = `${Date.now()}-${file.name}`;

    const {error } = await supabase.storage
        .from('images')
        .upload(fileName, file);

    if (error) {
        throw new Error(error.message);
    }

    const { data: publicUrl } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

    return publicUrl.publicUrl;
}
