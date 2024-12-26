import classes from './meals-grid.module.css';
import MealItem from "@/components/meals/meal-item";

export type Meal = {
    id: string | number,
    title: string,
    public_url: string,
    summary: string,
    creator: string,
    creator_email: string
}
export default function MealsGrid({meals}: { meals: Meal[] }) {

    if (!meals || meals.length === 0) {
        return <p className={classes.message}>No meals available.</p>;
    }

    return (
        <ul className={classes.meals}>
            {meals.map((meal) => (
                <MealItem
                    key={meal.id}
                    id={meal.id}
                    title={meal.title}
                    public_url={meal.public_url}
                    summary={meal.summary}
                    creator={meal.creator}
                />
            ))}
        </ul>
    );
}
