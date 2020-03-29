import {useState, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import * as Yup from 'yup';
import placeBid from '../pages/api/placeBid';
import readHighestBid from '../pages/api/readHighestBid';
import DataContext from '../lib/bidDataContext';

const BidForm = (props) => {

    const [bidData, setBidData] = useContext(DataContext);
    const [highestBid, setHighestBid] = useState(0);

    //console.log(bidData)
    let productId = bidData.props.productData.id;
    let auctionId = bidData.props.auctionEventID;
    let minBid = bidData.props.productData.minBid;
    let maxBid = bidData.props.productData.maxBid;

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
                    let buyOut = false;

                    console.log(values);

                    if(values == maxBid)
                        buyOut = true;
                    
                    placeBid(auctionId, productId, values, buyOut);
                }}
            >
            { formik => (
                <Form onSubmit={formik.handleSubmit}>
                <Form.Label htmlFor="userBid">Select Bid Amount</Form.Label>
                    <Form.Control as="select" name="userBid" {...formik.getFieldProps('userBid')}>
                        <option></option>
                        <option value={5}>{'+'}5</option>
                        <option value={10}>{'+'}10</option>
                        <option value={15}>{'+'}15</option>
                        <option value={20}>{'+'}20</option>
                        
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