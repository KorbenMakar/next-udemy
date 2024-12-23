'use client';


import {JSX} from "react";

export default function Error(): JSX.Element {
    return (
        <main className={'error'}>
            <h1>An error occurred!</h1>
            <p>Failed to create meal.</p>
        </main>
    );
}