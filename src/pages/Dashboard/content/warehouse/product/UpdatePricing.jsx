import React, {useEffect, useState} from 'react';
import styles from './createPricing.module.scss';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as productService from '../../../../../services/products/product-service';
import * as colorService from '../../../../../services/products/color-service';
import * as categoryService from '../../../../../services/products/category-service';
import * as productTypeService from '../../../../../services/products/productType-service';
import {toast} from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import {generateAndUploadQRCode} from '../../../../../firebase/generateAndUploadQRCode';
import {DashboardMain} from '../../../../../components/Dashboard/DashboardMain';
import {generateUniqueCode} from '../../../../../services/bill/random_mhd';
import {UploadMultipleImage, UploadOneImage} from '../../../../../firebase/UploadImage';
import * as productService1 from "../../../../../services/products/ProductService";

const schema = yup.object().shape({
    productId: yup.string().default(''),
    productCode: yup.string().required('Mã sản phẩm là bắt buộc'),
    productName: yup.string().required('Tên sản phẩm là bắt buộc'),
    description: yup.string().required('Mô tả là bắt buộc'),
    productType: yup.string().required('Loại sản phẩm là bắt buộc'),
    pricingList: yup.array().of(
        yup.object().shape({
            pricingId: yup.string().default(''),
            pricingName: yup.string().required('Tên giá là bắt buộc'),
            pricingCode: yup.string().required('Mã giá là bắt buộc'),
            price: yup.number().required('Giá là bắt buộc').transform((value, originalValue) => (originalValue === '' ? null : value))
                .required('Giá là bắt buộc')
                .positive('Giá phải là số dương'),
            size: yup.string().required('Kích thước là bắt buộc'),
            qrCode: yup.string().default(''),
            color: yup.string().required('Màu sắc là bắt buộc'),
            pricingImgUrl: yup.string(),
        })
    ),
    productImages: yup.array().of(
        yup.object().shape({
            imageId: yup.string().default(''),
            imageUrl: yup.string(),
        })
    ).required('Ảnh là bắt buộc'),
});

const CreatePricing = () => {
    const {role,pricingId} = useParams();
    const navigate = useNavigate();
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [productTypesByCategory, setProductTypesByCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [product,setProduct]= useState('');
    const [images,setImages]= useState([]);
    const [validateError, setValidateError] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            pricingList: [],
            productImages: []
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'pricingList',
    });
    const {fields: imageFields, append: appendImage, remove: removeImage} = useFieldArray({
        control,
        name: 'productImages',
    });
    const callbackFunction = (childData) => {
        setIsShowSidebar(childData);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getAllCategory();
            await getAllColor();
            await getAllProductType();
        };

        fetchData().then().catch();
    }, []);
    useEffect(() => {
        getProductById(pricingId)
    }, [pricingId]);
    const getProductById = (pricingId)=>{
        productService1.getProductById(pricingId).then(res =>{
            setProduct(res);
            setSelectedCategory(res.productType.category.categoryName)
            console.log(res.productType.category.categoryName);
            setValue('productId', res.productId);
            setValue('productCode', res.productCode);
            setValue('productName', res.productName);
            setValue('description', res.description);
            setValue('productType', JSON.stringify(res.productType));
            // Populate pricingList array
            const pricingListValues = res.pricingList?.map(pricing => ({
                pricingId : pricing.pricingId,
                pricingName: pricing.pricingName,
                pricingCode: pricing.pricingCode,
                pricingImgUrl : pricing.pricingImgUrl,
                quantity : pricing.quantity,
                price: pricing.price,
                size: pricing.size,
                qrCode: '',
                color: JSON.stringify(pricing.color)
            }));
            setValue('pricingList', pricingListValues);
            // Populate productImages array (assuming productImages is an array)
            const productImagesValues = res.productImages?.map(image => ({
                imageId: image.imageId,
                imageUrl: image.imageUrl
            }));
            setValue('productImages', productImagesValues);
            console.log(productImagesValues)
            setImages( [ res.productImages?.map((item => item.imageUrl))]);
            console.log(images)
        }).catch(err=>console.log(err))
    }
console.log(product)
    const getAllCategory = () => {
        categoryService.getAllCategory().then(res => setCategories(res)).catch(err => console.log(err));
    };

    const getAllColor = () => {
        colorService.getAllColor().then(res => setColors(res)).catch(err => console.log(err));
    };

    useEffect(() => {
        setProductTypesByCategory(
            productTypes?.filter(item => item.category?.categoryName === selectedCategory)
        );
    }, [selectedCategory, productTypes]);

    const getAllProductType = () => {
        productTypeService.getAllProductType()
            .then(res => setProductTypes(res))
            .catch(err => console.log(err));
    };
    const onSubmit = async (data) => {
        console.log(data);
        try {
            setIsSubmitting(true);
            const updatedPricingList = await Promise.all(data.pricingList.map(async (item) => {
                try {
                    const qrDataURL = await generateAndUploadQRCode({
                        pricingCode: item.pricingCode,
                        pricingName: item.pricingName,
                    });
                    return {
                        ...item,
                        qrCode: qrDataURL
                    };
                } catch (error) {
                    console.error('Error generating QR code:', error);
                    throw error;
                }
            }));
            setValidateError([])
            const updatedData = {
                ...data,
                pricingList: updatedPricingList.map(item => ({
                    ...item,
                    color: JSON.parse(item.color)
                })),
                productType: JSON.parse(data.productType)
            };
            console.log(updatedData);
            productService.updateProduct(pricingId,updatedData)
                .then(() => {
                    toast.success('Sửa thành công');
                    navigate(`/dashboard/${role}/warehouse`);
                })
                .catch(error => {
                    setIsSubmitting(false);
                    toast.error('Sửa thất bại');
                    console.error('Error updating product:', error);
                    setValidateError(error);
                });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Gửi thất bại');
            setValidateError(error);
        }
    };

    const handleImageUrlChange = async (uploadedImageUrls) => {
        const currentImages = productImages.map(img => ({...img}));

        for (let url of uploadedImageUrls) {
            currentImages.push({imageUrl: url});
        }

        await setValue('productImages', currentImages);
    };

    const handleOneImageUrlChange = async (uploadedImageUrl, index) => {
        await setValue(`pricingList[${index}].pricingImgUrl`, uploadedImageUrl);
    };
    return (
        <DashboardMain path={role} content={
            <div className="content-body">
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label>Mã sản phẩm:</label>
                        <input type="text" {...register('productCode')} disabled={true}/>
                        {errors.productCode && <p  className={styles.errorMessage}>{errors.productCode.message}</p>}
                        <small>{validateError?.productCode}</small>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Tên sản phẩm:</label>
                        <input type="text" {...register('productName')} />
                        {errors.productName && <p  className={styles.errorMessage}>{errors.productName.message}</p>}
                        <small  className={styles.errorMessage}>{validateError?.productName}</small>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Mô tả:</label>
                        <input type="text" {...register('description')} />
                        {errors.description && <p  className={styles.errorMessage}>{errors.description.message}</p>}
                        <small  className={styles.errorMessage}>{validateError?.description}</small>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Ảnh sản phẩm:</label>
                        <Controller
                            name="productImages"
                            control={control}
                            render={({field}) => (
                                <UploadMultipleImage onImageUrlChange={handleImageUrlChange} existingImageUrls={images}/>
                            )}
                        />
                        {errors.productImages && <p  className={styles.errorMessage}>{errors.productImages.message}</p>}
                        {/*<small>{validateError?.productImages}</small>*/}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Danh mục:</label>
                        <select onChange={event => setSelectedCategory(event.target.value)}>
                            <option value=''>--chọn danh mục--</option>
                            {
                                categories?.map((item, index) => (
                                    <option value={item.categoryName} key={item.categoryId}>{item.categoryName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Loại sản phẩm:</label>
                        <select {...register('productType')} >
                            <option value=''>--chọn loại sản phẩm--</option>
                            {
                                productTypesByCategory?.map((item, index) => (
                                    <option value={JSON.stringify(item)} key={item.typeId} selected={item.typeId === productTypes.typeId}>{item.typeName}</option>
                                ))
                            }
                        </select>
                        {errors.productType && <p  className={styles.errorMessage}>{errors.productType.message}</p>}
                        {/*<small>{validateError?.productType}</small>*/}
                    </div>
                    <div className={styles.pricingContainer}>
                        {fields.map((item, index) => (
                            <div key={item.id} className={styles.pricingRow}>
                                <div className={styles.formGroup}>
                                    <label>Mã sản pẩm chi tiết:</label>
                                    <input type="text" {...register(`pricingList[${index}].pricingCode`)}
                                           disabled={true}/>
                                    {errors.pricingList?.[index]?.pricingCode &&
                                        <p  className={styles.errorMessage}>{errors.pricingList[index].pricingCode.message}</p>}
                                    {/*<small>{validateError?.pricingList[index]?.pricingCode}</small>*/}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Tên sản phẩm chi tiết:</label>
                                    <input type="text" {...register(`pricingList[${index}].pricingName`)} />
                                    {errors.pricingList?.[index]?.pricingName &&
                                        <p  className={styles.errorMessage}>{errors.pricingList[index].pricingName.message}</p>}
                                    {/*<small>{validateError?.pricingList[index]?.pricingName}</small>*/}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Giá:</label>
                                    <input type="number" {...register(`pricingList[${index}].price`)} />
                                    {errors.pricingList?.[index]?.price &&
                                        <p  className={styles.errorMessage}>{errors.pricingList[index].price.message}</p>}
                                    {/*<small>{validateError?.pricingList[index]?.price}</small>*/}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Kích thước:</label>
                                    <input type="text" {...register(`pricingList[${index}].size`)} />
                                    {errors.pricingList?.[index]?.size &&
                                        <p  className={styles.errorMessage}>{errors.pricingList[index].size.message}</p>}
                                    {/*<small>{validateError?.pricingList[index]?.size}</small>*/}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Màu sắc:</label>
                                    <select {...register(`pricingList[${index}].color`)}>
                                        <option value=''>--chọn màu--</option>
                                        {
                                            colors?.map((item, colorIndex) => (
                                                <option value={JSON.stringify(item)}
                                                        key={colorIndex}>{item.colorName}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.pricingList?.[index]?.color &&
                                        <p  className={styles.errorMessage}>{errors.pricingList[index].color.message}</p>}
                                    {/*<small>{validateError?.pricingList[index]?.color}</small>*/}
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Ảnh sản phẩm chi tiết:</label>
                                    <Controller
                                        name={`pricingList[${index}].pricingImgUrl`}
                                        control={control}
                                        defaultValue={item.pricingImgUrl}
                                        render={({field}) => (
                                            <UploadOneImage
                                                onImageUrlChange={(url) => handleOneImageUrlChange(url, index)}
                                                existingImageUrl={product.pricingList[index].pricingImgUrl}
                                            />
                                        )}/>
                                    {errors.pricingList?.[index]?.pricingImgUrl &&
                                        <p  className={styles.errorMessage}>{errors.pricingList[index].pricingImgUrl.message}</p>}
                                    {/*<small>{validateError?.pricingList[index]?.pricingImgUrl}</small>*/}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button type="submit" className={styles.submitButton}
                                disabled={isSubmitting}>
                            {isSubmitting ? 'Đang xử lý...' : ' Sửa đổi'}
                        </button>
                    </div>
                </form>
            </div>
        } callbackFunction={callbackFunction} isShowSidebar={isShowSidebar}/>
    );
};

export default CreatePricing;
