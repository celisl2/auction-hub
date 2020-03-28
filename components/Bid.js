import {useState, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import * as Yup from 'yup';
import placeBid from '../pages/api/placeBid';
import DataContext from '../lib/bidDataContext';

const BidForm = (props) => {

    const [bidData, setBidData] = useContext(DataContext);

    let productId = props.productData.id;
    let auctionId = props.auctionEventID;
    let minBid = props.productData.minBid;
    let maxBid = props.productData.maxBid;

    const setBidIncrements = () => {
        
    }

    return (
        <Formik
                initialValues={{
                    userBid: ''
                }}
                validationSchema={
                    Yup.object({
                        userBid: Yup.string().required('Please select bid amount'),
                    })
                }
                onSubmit={ (values, {setSubmitting}) => {
                    
                    console.log(values);
                }}
            >
            { formik => (
                <Form onSubmit={formik.handleSubmit}>
                <Form.Label htmlFor="userBid">Select Bid Amount</Form.Label>
                    <Form.Control as="select" name="userBid" {...formik.getFieldProps('userBid')}>
                        <option></option>
                        <option value="school">School</option>
                        <option value="work">Work</option>
                        <option value="future">The future</option>
                        <option value="social">Social Life</option>
                        <option value="money">Money</option>
                    </Form.Control>
                    {formik.touched.userBid && formik.errors.userBid ? (
                    <div>{formik.errors.userBid}</div>) : null}
                    <Button className="space" variant="outline-success" type="submit">Place Bid</Button>
                </Form>
            )}
        </Formik>
    )
}

const Bid = (props) => {
    const [bid, setBid] = useState();

    return (
        <div>
            <h4>Current Bid Price</h4>
            <BidForm />
        </div>
    )
};
 export default Bid;