import Image from 'next/image';
import { getMeal } from '../../../../lib/meals';
import { notFound } from 'next/navigation';
import classes from './page.module.css';

export async function generateMetadata({ params }: { params: { mealId: string } }) {
    const resolvedParams = await params;
    const meal = await getMeal(resolvedParams.mealId);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary,
    };
}

export default async function MealDetailPage({ params }: { params: { mealId: string } }) {
    const resolvedParams = await params;
    if (!resolvedParams.mealId) {
        console.error('Invalid params:', resolvedParams);
        notFound();
    }

    let meal;
    try {
        meal = await getMeal(resolvedParams.mealId);
    } catch (error) {
        console.error('Error fetching meal:', error);
        notFound();
    }

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions?.replace(/\n/g, '<br />') || 'No instructions available.';

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image
                        fill
                        src={meal.public_url}
                        alt={meal.title || 'Meal'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}
                />
            </main>
        </>
    );
}
