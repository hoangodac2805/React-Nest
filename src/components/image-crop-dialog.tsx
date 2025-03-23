import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Slider } from '@/components/ui/slider'
import { DialogClose } from '@radix-ui/react-dialog'
import getCroppedImg from '@/lib/cropImage'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

interface DialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    image?: string;
    aspect?: number;
    showZoomSlider?: boolean;
    showRotateSlider?: boolean
    onHandleImage?: (image: Blob) => void
}

export function DialogCropImage({ image, aspect, showZoomSlider = false, showRotateSlider = false, onHandleImage, ...props }: DialogProps) {

    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [rotation, setRotation] = useState<number>(0)
    const [zoom, setZoom] = useState<number>(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [croppedImage, setCroppedImage] = useState<Blob | null>(null)

    const handleCompletedImage = useCallback((image: Blob) => {
        if (onHandleImage) {
            onHandleImage(image);
        }
    }, [onHandleImage])

    const cropImage = useMemo(() => {
        return image
    }, [image])

    const isShowZoomSlider = useMemo(() => {
        return showZoomSlider
    }, [showZoomSlider])

    const isShowRotateSlider = useMemo(() => {
        return showRotateSlider
    }, [showRotateSlider])

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const showCroppedImage = async () => {
        if (!croppedAreaPixels) return
        if (cropImage) {
            try {
                const croppedImage = await getCroppedImg(cropImage, croppedAreaPixels, rotation)
                // console.log('cropped', { croppedImage })
                setCroppedImage(croppedImage);
            } catch (e) {
                console.error(e)
            }
        }
    }

    const handleCloseDialog = async () => {
        showCroppedImage();
        props.onOpenChange?.(false);
    }


    useEffect(() => {
        if (croppedImage) {
            handleCompletedImage(croppedImage)
        }
    }, [croppedImage])
    return (
        <Dialog {...props} onOpenChange={handleCloseDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit image</DialogTitle>
                    <DialogDescription>
                        Make changes to your image here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="relative min-h-80">
                        <Cropper
                            image={cropImage}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    {
                        isShowZoomSlider && <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            className={cn("w-[60%]")}
                            onValueChange={(value) => setZoom(value[0])}
                        />
                    }

                    {
                        isShowRotateSlider && <Slider
                            value={[rotation]}
                            min={0}
                            max={360}
                            step={1}
                            className={cn("w-[60%]")}
                            onValueChange={(value) => setRotation(value[0])}
                        />
                    }


                    {/* {croppedImage && <img src={URL.createObjectURL(croppedImage)} />} */}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' onClick={showCroppedImage}>Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
