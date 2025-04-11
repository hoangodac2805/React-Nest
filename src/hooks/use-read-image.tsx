import React, { useState } from 'react'

const useReadImage = () => {
    const [image, setImage] = useState<string | null>(null);
    const readImage = (file: File | null) => {
        if (!file) {
            setImage(null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        }
        reader.readAsDataURL(file);
    }

    return { image, readImage };
}

export default useReadImage