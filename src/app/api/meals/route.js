import { supabase } from '../../../../lib/supabase';
import {getMeals} from "../../../../lib/meals";

export async function POST(req) {
    try {
        const formData = await req.json();
        const { data, error } = await supabase.from('meals').insert([formData]);

        return new Response(JSON.stringify({ success: true, data }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

export async function GET() {
    try {
        const meals = await getMeals();
        if (!meals || meals.length === 0) {
            throw new Error('No meals found');
        }
        return new Response(JSON.stringify(meals), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to fetch meals', details: error.message }),
            { status: 500 }
        );
    }
}
