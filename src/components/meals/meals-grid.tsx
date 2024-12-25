import classes from './meals-grid.module.css';
import MealItem from "@/components/meals/meal-item";

export type Meal = {
    id: string,
    title: string,
    slug: string,
    image: string,
    summary: string,
    creator: string
}
export default function MealsGrid({meals: meals}: { meals: Meal[] }) {
    return (
        <ul className={classes.meals}>
            {meals.map((meal) => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                </li>
            ))}
        </ul>
    );
}