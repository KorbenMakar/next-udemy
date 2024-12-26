import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export default function MealItem({
                                     title,
                                     public_url,
                                     summary,
                                     creator,
                                     id,
                                 }: {
    title: string;
    public_url: string;
    summary: string;
    creator: string;
    id: string | number;
}) {
    if (!title || !summary || !creator || !public_url) {
        return <p>Invalid meal data. Please check the server response.</p>;
    }

    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    <Image
                        src={public_url}
                        alt={title}
                        fill
                        sizes={'100%'}
                    />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${id}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}