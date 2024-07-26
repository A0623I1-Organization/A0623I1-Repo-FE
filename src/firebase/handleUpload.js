import {storage, database} from './firebase';
import {ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import {ref as dbRef, push, set} from 'firebase/database';
export const handleUploadMultiple = async (images, imageUrlPath, setValue) => {
    if (!images || images.length === 0) {
        console.error('No images to upload');
        return;
    }

    const uploadedImageUrls = [];
    try {
        for (let image of images) {
            const storageReference = storageRef(storage, `multipleImages/${image.name}`);
            console.log('Storage reference:', storageReference);

            const snapshot = await uploadBytes(storageReference, image);
            console.log('Uploaded a blob or file!', snapshot);

            const url = await getDownloadURL(storageReference);
            console.log('File available at', url);

            const dbImagesRef = dbRef(database, `images`);
            const newImageRef = push(dbImagesRef);
            await set(newImageRef, {
                imageUrl: url,
                imageName: image.name,
            });
            console.log('Image information saved to Realtime Database');

            uploadedImageUrls.push(url);
        }

        const handleImageUrlChange = async (uploadedImageUrls) => {
            console.log('Uploaded image URLs:', uploadedImageUrls);
            const currentImages = (await setValue(imageUrlPath)) || [];
            console.log('Current images:', currentImages);

            for (let url of uploadedImageUrls) {
                currentImages.push({ imageUrl: url });
            }
            await setValue(imageUrlPath, currentImages);
        };

        await handleImageUrlChange(uploadedImageUrls);

    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

export const handleUploadOne = async (image, imageUrlPath,setValue) => {
    if (!image) {
        console.error('No image to upload');
        return;
    }

    try {
        const storageReference = storageRef(storage, `multipleImages/${image.name}`);
        console.log('Storage reference:', storageReference);

        const snapshot = await uploadBytes(storageReference, image);
        console.log('Uploaded a blob or file!', snapshot);

        const url = await getDownloadURL(storageReference);
        console.log('File available at', url);

        const dbImagesRef = dbRef(database, `images`);
        const newImageRef = push(dbImagesRef);
        await set(newImageRef, {
            imageUrl: url,
            imageName: image.name,
        });
        console.log('Image information saved to Realtime Database');

        await setValue(imageUrlPath, url);
        console.log(url)
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};
