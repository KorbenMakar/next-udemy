'use client';

import classes from './image-picker.module.css';
import React, {JSX, useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}: { label: string, name: string }): JSX.Element {
    const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(null)

    const imageInput = useRef<HTMLInputElement | null>(null);
    function handlePickClick() {
        if (imageInput.current) {
            imageInput.current.click();
        }
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPickedImage(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            setPickedImage(null);
            return;
        }
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked.</p>}
                    {pickedImage && (
                        <Image src={pickedImage as string}
                               alt={'The image selected by the user.'}
                               fill
                        />
                    )}
                </div>
                <input className={classes.input}
                       type="file"
                       id={name}
                       accept=".jpg,.jpeg,.png"
                       name={name}
                       ref={imageInput}
                       onChange={handleImageChange}
                       required
                />
                <button className={classes.button}
                        type={'button'}
                        onClick={handlePickClick}
                >
                    Pick Image
                </button>
            </div>
        </div>
    );
}