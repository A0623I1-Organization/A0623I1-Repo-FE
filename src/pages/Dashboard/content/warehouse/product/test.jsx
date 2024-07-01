import React, {useEffect, useState} from 'react';
import styles from './createPricing.module.scss';
import {HeaderDashboard} from '../../../../../components/Header/HeaderDashboard';
import {SidebarDashboard} from '../../../../../components/Sidebar/SidebarDashboard';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UploadImage from '../../../../../firebase/UploadImage';
import * as productService from '../../../../../services/products/product-service'
import * as colorService from '../../../../../services/products/color-service'
import * as categoryService from '../../../../../services/products/category-service'
import * as productTypeService from '../../../../../services/products/productType-service'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
const schema = yup.object().shape({
    productCode: yup.string().required('Product Code is required'),
    productName: yup.string().required('Product Name is required'),
    description: yup.string().required('Description is required'),
    // productType: yup.object().shape({
    //     category: yup.string().required('Category is required'),
    //     typeName: yup.string().required('Product Type is required'),
    // }),
    productType:yup.string().required('Description is required'),
    pricingList: yup.array().of(
        yup.object().shape({
            pricingName: yup.string().required('Pricing Name is required'),
            pricingCode: yup.string().required('Pricing Code is required'),
            price: yup.number().required('Price is required').positive('Price must be positive'),
            size: yup.string().required('Size is required'),
            qrCode: yup.string().required('QR Code is required'),
            inventory: yup.number().required('Inventory is required').integer('Inventory must be an integer'),
            color: yup.string().required('Color is required'),
            pricingImgUrl: yup.string().url('Must be a valid URL').required('Pricing Image URL is required'),
        })
    ),
    // productImages: yup.mixed().required('Images are required'), // Define images field in your schema
    productImages: yup.array().of(
        yup.object().shape({
            imageUrl: yup.string().url('Must be a valid URL').required('Image URL is required'),
        })
    ).required('Images are required'),
});

const CreatePricing = () => {
    const navigate = useNavigate();
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [colors,setColors] = useState([])
    const [categories,setCategories] = useState([])
    const [productTypes,setProductTypes] = useState([])
    const [selectedCategory,setSelectedCategory] = useState('1')
    // Khai báo biến productImages ở đây
    const [productImages, setProductImages] = useState([]);
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            pricingList: [],
            productImages: [],
        }
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'pricingList',
    });
    const {fieldI, appendI, removeI} = useFieldArray({
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
        };

        fetchData().then().catch();
    }, []);
    // get colors
    const getAllCategory=()=>{
        categoryService.getAllCategory().then(res=>setCategories(res)).catch(err=>console.log(err))
    }
    // get category
    const getAllColor=()=>{
        colorService.getAllColor().then(res=>setColors(res)).catch(err=>console.log(err))
    }

    // get product type by category name
    useEffect(() => {
        if (selectedCategory !== '') {
            getAllProductTypeByCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const getAllProductTypeByCategory=(selectedCategory)=>{
        productTypeService.getAllProductTypeByCategory(selectedCategory).then(res=>setProductTypes(res)).catch(err=>console.log(err))
    }

    const handleAddPricingRow = () => {
        append({});
    };

    const handleRemovePricingRow = (index) => {
        remove(index);
    };

    const onSubmit = (data) => {
        console.log("jdjd")
        const value = {
            ...data,
            productType: JSON.parse(data.productType)
        };
        console.log(data)
        productService.createProduct(value).then(() => {
            toast.success("Create Success");
            navigate("/create-pricing");
        }).catch(err => {
            toast.error("Create Failed");
            console.log(err);
        });
    };

    // const handleImageUrlChange = (uploadedImageUrls) => {
    //     // Assuming uploadedImageUrls is an array of image URLs
    //     setValue('productImages', uploadedImageUrls); // Set the value of 'images' field
    // };
    const handleImageUrlChange = async (uploadedImageUrls) => {
        // Đảm bảo rằng đã có giá trị hiện tại của productImages
        const currentImages = productImages.map(img => ({ ...img }));

        // Thêm các URL mới vào mảng productImages
        for (let url of uploadedImageUrls) {
            currentImages.push({ imageUrl: url });
        }

        // Cập nhật giá trị của productImages trong useForm
        setValue('productImages', currentImages);
    };
    return (
        <div className="app-container">
            <HeaderDashboard parentCallback={callbackFunction}/>
            <div className="content-wrapper">
                <SidebarDashboard showSidebar={isShowSidebar}/>
                <div className="app-content">
                    <div className="content-body">
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.formGroup}>
                                <label>Product Code:</label>
                                <Controller
                                    name="productCode"
                                    control={control}
                                    render={({field}) => <input type="text" {...field} />}
                                />
                                {errors.productCode && <p>{errors.productCode.message}</p>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Product Name:</label>
                                <Controller
                                    name="productName"
                                    control={control}
                                    render={({field}) => <input type="text" {...field} />}
                                />
                                {errors.productName && <p>{errors.productName.message}</p>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Description:</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({field}) => <input type="text" {...field} />}
                                />
                                {errors.description && <p>{errors.description.message}</p>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Images:</label>
                                <Controller
                                    name="productImages"
                                    control={control}
                                    render={({field}) => (
                                        <UploadImage onImageUrlChange={handleImageUrlChange}/>
                                    )}
                                />
                                {errors.productImages && <p>{errors.productImages.message}</p>}
                            </div>

                            <div className={styles.formGroup}>
                                <label>Category:</label>
                                {/*<Controller*/}
                                {/*    name="productType.category"*/}
                                {/*    control={control}*/}
                                {/*    render={({ field }) => (*/}
                                <select onChange={event => (
                                    setSelectedCategory(event.target.value)
                                    // setValue('productType.category',event.target.value)
                                    // console.log(event.target.value)
                                )}>
                                    <option value=''>--choose Category --</option>
                                    {categories?.map((item, index) => (
                                        <option value={item.categoryId} key={item.categoryId}>{item.categoryName}</option>
                                    ))}
                                </select>
                                {/*    )}*/}
                                {/*/>*/}
                                {/*{errors.productType?.category && <p>{errors.productType.category.message}</p>}*/}
                            </div>

                            <div className={styles.formGroup}>
                                <label>Product Type:</label>
                                <Controller
                                    name="productType.typeName"
                                    control={control}
                                    render={({ field }) => (
                                        <select {...field} >
                                            <option value=''>--choose Product type --</option>
                                            {productTypes?.map((item, index) => (
                                                <option value={JSON.stringify(item)} key={item.typeId}>{item.typeName}</option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.productType?.typeName && <p>{errors.productType.typeName.message}</p>}
                            </div>


                            <div className={styles.pricingContainer}>
                                {fields.map((item, index) => (
                                    <div key={item.id} className={styles.pricingRow}>
                                        <div className={styles.formGroup}>
                                            <label>Pricing Name:</label>
                                            <Controller
                                                name={`pricingList[${index}].pricingName`}
                                                control={control}
                                                defaultValue={item.pricingName}
                                                render={({field}) => <input type="text" {...field} />}
                                            />
                                            {errors.pricingList?.[index]?.pricingName &&
                                                <p>{errors.pricingList[index].pricingName.message}</p>}
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Pricing Code:</label>
                                            <Controller
                                                name={`pricingList[${index}].pricingCode`}
                                                control={control}
                                                defaultValue={item.pricingCode}
                                                render={({field}) => <input type="text" {...field} />}
                                            />
                                            {errors.pricingList?.[index]?.pricingCode &&
                                                <p>{errors.pricingList[index].pricingCode.message}</p>}
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Price:</label>
                                            <Controller
                                                name={`pricingList[${index}].price`}
                                                control={control}
                                                defaultValue={item.price}
                                                render={({field}) => <input type="number" {...field} />}
                                            />
                                            {errors.pricingList?.[index]?.price &&
                                                <p>{errors.pricingList[index].price.message}</p>}
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Size:</label>
                                            <Controller
                                                name={`pricingList[${index}].size`}
                                                control={control}
                                                defaultValue={item.size}
                                                render={({field}) => <input type="text" {...field} />}
                                            />
                                            {errors.pricingList?.[index]?.size &&
                                                <p>{errors.pricingList[index].size.message}</p>}
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>QR Code:</label>
                                            <Controller
                                                name={`pricingList[${index}].qrCode`}
                                                control={control}
                                                defaultValue={item.qrCode}
                                                render={({field}) => <input type="text" {...field} />}
                                            />
                                            {errors.pricingList?.[index]?.qrCode &&
                                                <p>{errors.pricingList[index].qrCode.message}</p>}
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Inventory:</label>
                                            <Controller
                                                name={`pricingList[${index}].inventory`}
                                                control={control}
                                                defaultValue={item.inventory}
                                                render={({field}) => <input type="number" {...field} />}
                                            />
                                            {errors.pricingList?.[index]?.inventory &&
                                                <p>{errors.pricingList[index].inventory.message}</p>}
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Color:</label>
                                            <Controller
                                                name={`pricingList[${index}].color`}
                                                control={control}
                                                defaultValue={item.color}
                                                render={({field}) =>
                                                    (
                                                        <select {...field}>
                                                            <option value=''>--choose Color --</option>
                                                            {
                                                                colors?.map((item,index)=>(
                                                                    <option value={item.colorName} key={item.colorId}>{item.colorName}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    )}
                                            />
                                            {errors.pricingList?.[index]?.color &&
                                                <p>{errors.pricingList[index].color.message}</p>}
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Pricing Image URL:</label>
                                            <Controller
                                                name={`pricingList[${index}].pricingImgUrl`}
                                                control={control}
                                                defaultValue={item.pricingImgUrl}
                                                render={({field}) => <input type="text" {...field} />}
                                            />
                                            {errors.pricingList?.[index]?.pricingImgUrl &&
                                                <p>{errors.pricingList[index].pricingImgUrl.message}</p>}
                                        </div>
                                        <button type="button" onClick={() => handleRemovePricingRow(index)}
                                                className={styles.removeButton}>
                                            -
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.buttonWrapper}>
                                <button type="submit" className={styles.submitButton}>
                                    Xác nhận
                                </button>
                                <button type="button" onClick={handleAddPricingRow} className={
                                    styles.addButton}>
                                    +
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePricing;