import { Formik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {loadDB} from './../lib/db';

let db = loadDB();

export default () => {
    const [dbCode, setDBCode] = useState(null);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);
    const [color, setColor] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const unsubscribe = db
        .firestore()
        .collection('AdminResources').doc('RegistrationCode')
        .onSnapshot( (snapshot) => {
            if(snapshot.get('accessCode')) {
                setDBCode(snapshot.get('accessCode'));
            }
        });
        return () => { unsubscribe() };
    })

    return (
        <div>

            <Alert variant='info'>
                <div className="access">
                    <Alert.Heading>
                        <h4>Access Code for Administrator Registration:</h4>
                        <p>{' ' + dbCode}</p>
                    </Alert.Heading>
                </div>
                <hr />
                <p>This code is confidential. Send this code to users that wish to use Auction Hub with administrator privileges. You can edit this code whenever you like by clicking on the code below.</p>
                <Button variant="dark" onClick={handleShow}>
                    Change Access Code
                </Button>
            </Alert>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Access Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            code: dbCode,
                        }}
                        //Builds the validation for entering data.
                        validationSchema={
                            Yup.object({
                                code: Yup.string()
                                    .required('Please enter new access code'),
                            })}
                        //Submit the data to process.
                        onSubmit={(values, {setSubmitting}) => {
                            db
                                .firestore()
                                .collection("AdminResources")
                                .doc("RegistrationCode")
                                .set({accessCode: values.code})
                                .then( (results) => {
                                    setMessage('Access code successfully changed.');
                                    setColor('success');
                                })
                                .catch( (error) => {
                                    setMessage('Something went wrong. Please try again later');
                                    setColor('danger');
                                    console.error(error);
                                })
                            //important part for this to work is to set the new code as values.code
                        }}
                    >

                    {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        {message ? <Alert variant={color}>{message}</Alert> : ''}
                        <Form.Group>
                            <Form.Label htmlFor="code">Access Code</Form.Label>
                            <Form.Control name="code" {...formik.getFieldProps('code')} />
                            {formik.touched.code && formik.errors.code ? (
                                <Alert variant='danger'>{formik.errors.code}</Alert>) : null}
                                <Button className='space' variant="primary" type="submit">Save Changes</Button>
                        </Form.Group>
                    </Form>
                    )}

                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}
