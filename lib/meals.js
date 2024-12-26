import {supabase} from './supabase';
import {uploadImage} from './storage';
export async function getMeals() {
    const { data, error } = await supabase.from('meals').select('*');
    if (error) {
        console.error('Error fetching meals:', error);
        return [];
    }

    return data.filter(
        (meal) => meal.title && meal.public_url && meal.summary && meal.creator
    );
}

export async function getMeal(mealId) {
    const { data, error } = await supabase.from('meals').select('*').eq('id', mealId).single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function saveMeal(meal) {
    if (!meal.title || !meal.summary || !meal.instructions || !meal.creator || !meal.creator_email || !meal.image) {
        throw new Error('Invalid meal data. All fields are required.');
    }

    const filePath = meal.image.name;
    const publicUrl = await uploadImage(meal.image, filePath);

    if (!publicUrl) {
        throw new Error('Failed to upload image to storage.');
    }

    const { data, error } = await supabase.from('meals').insert([
        {
            title: meal.title,
            summary: meal.summary,
            instructions: meal.instructions,
            creator: meal.creator,
            creator_email: meal.creator_email,
            public_url: publicUrl,
        },
    ]);

    if (error) {
        throw new Error(error.message || 'An unknown error occurred while saving the meal.');
    }

    return data;
}

