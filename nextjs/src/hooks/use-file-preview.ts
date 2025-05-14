'use client';
import { useEffect, useState } from "react";

const imageMimeType: RegExp = /image\/(png|jpg|jpeg)/i;

export function useFileImagePreview(file: File) {
    const [fileDataURL, setFileDataURL] = useState(null);
    const reader = new FileReader().readAsDataURL(file);

    if (!file.type.match(imageMimeType)) {
        alert("Image mime type is not valid");
        return;
    }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            reader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);
}