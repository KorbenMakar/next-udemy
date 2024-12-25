import { supabase } from '../../../../lib/supabase';

export async function POST(req) {
    try {
        const formData = await req.json();
        console.log('Received meal data:', formData);

        const { data, error } = await supabase.from('meals').insert([formData]);

        console.log('Supabase response:', { data, error: error});

        if (error) {
            throw new Error(error.message);
        }

        return new Response(JSON.stringify({ success: true, data }), { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/meals:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase.from('meals').select('*');

        console.log('Supabase GET response:', { data, error });

        if (error) {
            throw new Error(error.message);
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/meals:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
