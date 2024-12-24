'use server';

import {saveMeal} from "./meals";
import {redirect} from 'next/navigation';
import {revalidatePath} from "next/cache";

function isInvalidText(text: string) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState: any,formData: FormData) {
    const meal = {
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        instructions: formData.get('instructions') as string,
        image: formData.get('image') as File,
        creator: formData.get('name') as string,
        creator_email: formData.get('email') as string,
    };

    if (isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        !meal.image || meal.image.size === 0 ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.creator_email.includes('.')
    ) {
        return {
            message: 'Invalid input.',
        }
    }

    await saveMeal(meal);
    revalidatePath(`/meals`);
    redirect(`/meals`);
}