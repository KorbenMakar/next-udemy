'use client';

import {JSX} from "react";

export default function Error({error}: { error: string }): JSX.Element {
    return (
        <main className={'error'}>
            <h1>An error occurred!</h1>
            <p>{error}</p>
        </main>
    );
}