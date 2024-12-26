import { supabase } from './supabase';

export async function uploadImage(file, path) {

    try {
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('images')
            .upload(path, file);

        if (uploadError) {
            throw new Error('Failed to upload image to storage.');
        }

        const { data: publicUrlData, error: publicUrlError } = supabase.storage
            .from('images')
            .getPublicUrl(path);

        if (publicUrlError) {
            throw new Error('Failed to generate public URL.');
        }

        return publicUrlData.publicUrl;
    } catch (error) {
        throw error;
    }
}
