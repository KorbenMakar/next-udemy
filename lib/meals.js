import { supabase } from './supabase';
import slugify from 'slugify';
import xss from "xss";


function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMeals() {
    await delay(2000); // Эмулируем задержку

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
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
    meal.image = `/images/${fileName}`;

    const { data, error } = await supabase.from('meals').insert([meal]);
    if (error) {
        throw new Error(error.message);
    }

    return data;
}
