import {useEffect, useState} from "react";

export const UploadMultiple = ({ existingUrlImage, onImageChange }) => {
    const [images, setImages] = useState([]);
    const [existingUrlImages, setExistingUrlImages] = useState([]);

    // Update existingImages when existingImage prop changes
    useEffect(() => {
        setExistingUrlImages(existingUrlImage?.flat());
    }, [existingUrlImage]);
    console.log(existingUrlImages)
    // Handle file input change
    const handleChange = (e) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    // Call onImageChange when images state changes
    useEffect(() => {
        if (images.length > 0) {
            // Create URLs for the newly selected images
            const imageUrls = images.map((file) => file);
            onImageChange(imageUrls);
        }
        setExistingUrlImages([])
    }, [images]);

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={handleChange}
                accept=".xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf"
            />
            {existingUrlImages?.length >0 &&
                existingUrlImages.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        width="100px"
                        alt={`Existing image ${index + 1}`}
                        style={{ marginLeft: '5px' }}
                    />
                ))}
            {images &&
                images.map((file, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        width="100px"
                        alt={`Uploaded image ${index + 1}`}
                        style={{ marginLeft: '5px' }}
                    />
                ))}
        </div>
    );
};
export const UploadOne = ({ onImageChange, existingImageUrl }) => {
    const [image, setImage] = useState(null);
    const [existingImageUrls, setExistingImageUrls] = useState(null);

    useEffect(() => {
        setExistingImageUrls(existingImageUrl);
    }, [existingImageUrl]);
    console.log(existingImageUrls)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            onImageChange(selectedImage);
            console.log(selectedImage)
            setExistingImageUrls(null); // Đặt existingImageUrls thành null khi chọn ảnh mới
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleChange}
                accept=".xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf"
            />
            <div>
                {existingImageUrls && (
                    <img
                        src={existingImageUrls}
                        width="200px"
                        alt={`Existing file preview`}
                    />
                )}
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        width="200px"
                        alt={`Selected file preview`}
                    />
                )}
            </div>
        </div>
    );
};
