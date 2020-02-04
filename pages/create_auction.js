/*
    TODO: add block comments to all pages
*/

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {getCode} from '../utils/helperFunctions';
import AdminNav from '../components/AdminNav';

const CreateAuctionForm = () => {
    return(
        <Formik
            initialValues={{
                title: '',
                date: '',
                time: '',
                description: '',
                imageURL: '',
                location: {
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    zip: ''
                },
                paymentLimitTime: '',
                pickUpInformation: ''
            }}
            validationSchema={
                Yup.object({
                    title: Yup.string()
                        .required('Please enter auction title'),
                    date: Yup.string()
                        .required('Please enter auction date'),
                    time: Yup.string()
                        .required('Please enter auction time'),
                    description: Yup.string()
                        .required('Please enter auction description'),
                    imageURL: Yup.string()
                        .required('enter url'),
                    location: Yup.object().shape({
                        addressLine1: Yup.string().required('enter address'),
                        addressLine2: Yup.string().notRequired(),
                        city: Yup.string().required('enter city'),
                        state: Yup.string().required('enter state'),
                        zip: Yup.string().required('enter zip code').min(5, 'enter valid zip code number')
                    }),
                    paymentLimitTime: Yup.string().required('Enter payment waiting period in hours'),
                    pickUpInformation: Yup.string().required('Enter pickup information for all products in auction. This information can be overriden in the create products page.')

                })}
            onSubmit={(values) => {
                
                alert(JSON.stringify(values, null, 2));
                //setSubmitting(false);
                
            }}
        >
            {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title</label>
                <input name="title" {...formik.getFieldProps('title')} />
                    {formik.touched.title && formik.errors.title ? (
                        <div>{formik.errors.title}</div>) : null}
        
                <label htmlFor="date">Date</label>
                <input name="date" {...formik.getFieldProps('date')} />
                    {formik.touched.date && formik.errors.date ? (
                        <div>{formik.errors.date}</div>) : null}
                
                <label htmlFor="time">Time</label>
                <input name="time" {...formik.getFieldProps('time')} />
                    {formik.touched.time && formik.errors.time ? (
                        <div>{formik.errors.time}</div>) : null}

                <label htmlFor="description">Description</label>
                <input name="description" {...formik.getFieldProps('description')} />
                    {formik.touched.description && formik.errors.description ? (
                        <div>{formik.errors.description}</div>) : null}

                <label htmlFor="imageURL">Image URL</label>
                <input name="imageURL" {...formik.getFieldProps('imageURL')} />
                    {formik.touched.imageURL && formik.errors.imageURL ? (
                        <div>{formik.errors.imageURL}</div>) : null}
                
                <label htmlFor="location.addressLine1">Address</label>
                <input name="location.addressLine1" {...formik.getFieldProps('location.addressLine1')} />
                {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
                        <div>{formik.errors.addressLine1}</div>) : null}

                <label htmlFor="location.addressLine2">Appartment{getCode(44)} suite{getCode(44)} etc{getCode(46)}</label>
                <input name="location.addressLine2" {...formik.getFieldProps('location.addressLine2')} />
                {formik.touched.addressLine2 && formik.errors.addressLine2 ? (
                        <div>{formik.errors.addressLine2}</div>) : null}

                <label htmlFor="location.city">City</label>
                <input name="location.city" {...formik.getFieldProps('location.city')} />
                {formik.touched.city && formik.errors.city ? (
                        <div>{formik.errors.city}</div>) : null}
                
                <label htmlFor="location.state">State</label>
                <input name="location.state" {...formik.getFieldProps('location.state')} />
                {formik.touched.state && formik.errors.state ? (
                        <div>{formik.errors.state}</div>) : null}
                
                <label htmlFor="location.zip">Zip Code</label>
                <input name="location.zip" {...formik.getFieldProps('location.zip')} />
                {formik.touched.zip && formik.errors.zip ? (
                        <div>{formik.errors.zip}</div>) : null}
                
                <label htmlFor="paymentLimitTime">Payment Time Limit</label>
                <input name="paymentLimitTime" {...formik.getFieldProps('paymentLimitTime')} />
                    {formik.touched.paymentLimitTime && formik.errors.paymentLimitTime ? (
                        <div>{formik.errors.paymentLimitTime}</div>) : null}
                
                <label htmlFor="pickUpInformation">Pick Up Information</label>
                <input name="pickUpInformation" {...formik.getFieldProps('pickUpInformation')} />
                    {formik.touched.pickUpInformation && formik.errors.pickUpInformation ? (
                        <div>{formik.errors.pickUpInformation}</div>) : null}


                <button type="submit">Submit</button>
            </form>
            )}
            

        </Formik>
    );
};

let CreateAuction = () =>
    <div className="auction-creation-body">
        <AdminNav />
        <h2>Create Auction Event</h2>
        <CreateAuctionForm />
    </div>;
export default CreateAuction;