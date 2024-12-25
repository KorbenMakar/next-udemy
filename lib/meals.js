import {supabase} from './supabase';
import {uploadImage} from './storage';

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMeals() {
    await delay(2000);

    const { data, error } = await supabase.from('meals').select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function getMeal(slug) {
    const { data, error } = await supabase.from('meals').select('*').eq('slug', slug).single();
    if (error) {
        throw new Error(error.message);
    }
    return data;
}

export async function saveMeal(meal) {
    meal.image = await uploadImage(meal.image);

    const { data, error } = await supabase.from('meals').insert([meal]);
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

