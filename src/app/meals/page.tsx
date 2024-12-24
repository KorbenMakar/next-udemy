import Link from "next/link";
import classes from './page.module.css';
import {getMeals} from '../../../lib/meals';
import MealsGrid from "@/components/meals/meals-grid";
import {Suspense} from "react";

// const cache = new Map();

// function cacheFunction<T extends (...args: unknown[]) => Promise<unknown>>(fn: T): T {
//     return (async function(...args: Parameters<T>): Promise<ReturnType<T>> {
//         const key = JSON.stringify(args);
//         if (cache.has(key)) {
//             return cache.get(key) as ReturnType<T>;
//         }
//         const result = await fn(...args);
//         cache.set(key, result as ReturnType<T>);
//         return result as ReturnType<T>;
//     }) as T;
// }

// const getCachedMeals = cacheFunction(getMeals);

export const metadata = {
    title: 'All Meals',
    description: 'Super Meals for everybody!!!',
};


async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, <span className={classes.highlight}>just for you</span>
                </h1>
                <p>
                    Choose your favorite dish from our broad selection of available meals. Enjoy a delicious lunch or
                    dinner at home.
                </p>
                <p className={classes.cta}>
                    <Link href={"/meals/share"}>
                        Share Your Favorite Recipe!
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching Data...</p>}>
                    <Meals/>
                </Suspense>
            </main>
        </>
    );
}
