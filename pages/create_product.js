import { Formik } from 'formik';
import * as Yup from 'yup';
import {getCode} from '../utils/helperFunctions';
import AdminNav from '../components/AdminNav';

const CreateProductForm = () => {
    return (
        <Formik
            initialValues={{
                productName: '',
                productDescription: '',
                productImageURL: '',
                minBid: '',
                maxBid: '',
                productPickUpInfo: ''
            }}
            validationSchema={
                Yup.object({
                    productName: Yup.string().required('Please enter product name'),
                    productDescription: Yup.string().notRequired(),
                    productImageURL: Yup.string().required('Please enter the product\'s image URL'),
                    minBid: Yup.number().required('Please enter minimum bid'),
                    maxBid: Yup.number().required('Please enter max bid'),
                    productPickUpInfo: Yup.string().notRequired()
                })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
        >

        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="productName">Product Name</label>
                <input name="productName" {...formik.getFieldProps('productName')} />
                {formik.touched.productName && formik.errors.productName ? (
                    <div>{formik.errors.productName}</div>) : null}

                <label htmlFor="productDescription">Product Description</label>
                <input name="productDescription" {...formik.getFieldProps('productDescription')} />
                {formik.touched.productDescription && formik.errors.productDescription ? (
                    <div>{formik.errors.productDescription}</div>) : null}
                
                <label htmlFor="productImageURL">Image URL</label>
                <input name="productImageURL" {...formik.getFieldProps('productImageURL')} />
                {formik.touched.productImageURL && formik.errors.productImageURL ? (
                    <div>{formik.errors.productImageURL}</div>) : null}
                
                
                <label htmlFor="minBid">Min Bid</label>
                <input name="minBid" {...formik.getFieldProps('minBid')} />
                {formik.touched.minBid && formik.errors.minBid ? (
                    <div>{formik.errors.minBid}</div>) : null}

                <label htmlFor="maxBid">Max Bid</label>
                <input name="maxBid" {...formik.getFieldProps('maxBid')} />
                {formik.touched.maxBid && formik.errors.maxBid ? (
                    <div>{formik.errors.maxBid}</div>) : null}
                
                <label htmlFor="productPickUpInfo">Product Pick Up Information <span>{getCode(40)}optional{getCode(41)}</span></label>
                <input name="productPickUpInfo" {...formik.getFieldProps('productPickUpInfo')} />
                {formik.touched.productPickUpInfo && formik.errors.productPickUpInfo ? (
                    <div>{formik.errors.productPickUpInfo}</div>) : null}
                    <button type="submit">Save</button>
            </form>
        )}

        </Formik>
    );
}

//TODO: create another button for adding another product

const CreateProduct = () => 
    <div className="create-product-body">
        <AdminNav />
        <h2>Create Auction Product</h2>
        <CreateProductForm />
    </div>

export default CreateProduct;