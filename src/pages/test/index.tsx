import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useReadImage from '@/hooks/use-read-image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { DialogCropImage } from '@/components/image-crop-dialog'


type Props = {}

const Test: React.FC<Props> = () => {
    const { image, readImage } = useReadImage();
    const [croppedImage, setCroppedImage] = useState<Blob>();
    const [imgEditable, setImgEditTable] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        readImage(file);
        setImgEditTable(true);
    }
    return (
        <>
            <div className="max-w-5xl mx-auto my-10 grid grid-cols-2 gap-6">
                <Label htmlFor="picture" className="col-span-2">
                    Picture
                </Label>
                <div>
                    <Input id="picture" type="file" onChange={handleFileChange} />
                    {image && <Button onClick={() => {
                        setImgEditTable(true)
                    }}>Edit Image</Button>}
                </div>
                <div>
                    {croppedImage && <img src={URL.createObjectURL(croppedImage)} />}
                </div>
            </div>
            <DialogCropImage
                open={imgEditable}
                onOpenChange={() => { setImgEditTable(false) }}
                image={image ? image : undefined}
                onHandleImage={(image) => {
                    setCroppedImage(image)
                }}
            />
        </>
    )
}

export default Test;



