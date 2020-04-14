/*

File Name: reports.js
Purpose: Displays data for auction events
Document Created By: Team 1

*/

import AdminNav from '../components/AdminNav';
import Footer from '../components/Footer';
import {getCode} from '../utils/helperFunctions';
import {useMemo, useState, useEffect} from 'react';
import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import generateReportsForAuction from '../pages/api/createReportForAuction';
import {loadDB} from '../lib/db';
let db = loadDB();

function createAuctionReport (auctionID) {
    let data = {};
    try {
        db
        .firestore()
        .collection('/AuctionEvent/' + auctionID + '/AuctionProduct')
        .get()
        .then( (productsSnapshot) => {
            if(productsSnapshot.size) {
                let batchCreateReport = db.firestore().batch();
                productsSnapshot.docs.forEach( (product) => {
                    // We could also save bid data with products to reduce "JOIN" reads
                    // Get the bid history for each product.
                    // Here I am assuming we only track the highest bid.
                    db
                    .firestore()
                    .collection('/AuctionEvent/' + auctionID + '/AuctionProduct/' + product.id + '/BidHistory')
                    .orderBy('amount', 'desc')
                    .get()
                    .then( (bidDataSnapshot) => {
                        if (bidDataSnapshot.size) {
                            let winnerBid = { id: bidDataSnapshot[0].id, ...bidDataSnapshot.data() };
                            db
                            .firestore()
                            .doc('/Users/' + bidDataSnapshot.id)
                            .get()
                            .then( (highBidUserSnap) => {
                                if (highBidUserSnap.exists) {
                                    let winningUser = {
                                        id: highBidUserSnap.id,
                                        firstName: highBidUserSnap.firstName,
                                        lastName: highBidUserSnap.lastName,
                                        email: highBidUserSnap.email,
                                    }
                                    // Finally, all information obtained. Add to batch write
                                    let reportDoc = {
                                        paymentMethod: null,   // Can save a "map" of more data (like address in auctionEvent)
                                        pickedUp: null,  // timestamp, or boolean
                                        winningBid: winnerBid,
                                        winningUser: winningUser,
                                        //productInfo: {id: product.id, ...product.data()}
                                    };
                                    data = JSON.parse(JSON.stringify(reportDoc));

                                    batchCreateReport.set(db.firestore().doc(
                                        '/AuctionEvent/' + auctionID + '/AfterEventReport/' + product.id), reportDoc)
                                }
                                else {
                                    console.log("Cannot find the user associated with the highest bid " + winnerBid.id);
                                }
                                
                            })
                            .catch( (err) => {
                                console.error( "Error in (createReportSnippet) getting user data associated with highest bid: " + err);
                            })
                        }
                        else {
                            console.log("No bids for product (ID: " + product.id + ") in auction event (ID: " + auctionID + ")." )
                            // Do you want to do something special w/ no bid auction?
                        }
                    })
                    .catch( (err) => {
                        console.error( "Error in (createReportSnippet) getting bid data: " + err);
                    })
                })
                batchCreateReport.commit()
                .then( (results) => {
                    console.log("Creating report is success");
                })
                .catch( (err) => {
                    console.error("Error: Batch writing report data failed. Reason: " + err);
                })
            }
            else {
                console.log("No products in auction. No reports to create.")
            }
        })
        .catch( (err) => {
            console.error( "Error in (createReportSnippet) getting product data: " + err);
        })
    }
    catch (exc) {
        console.error( "Try catched exception: " + exc);
    }
    return data;
}


const ReportsTable = ({columns, data}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    return (
        <Table striped bordered hover {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                        )
                    })}
            </tbody>
        </Table>
    )
}

const MyTable = () => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(() => {
        return [{
            productName: 'prod',
            productPrice: 'price',
            user: 'user name',
            userEmail: 'email',
            phoneNumber: '897329387',
            paymentStatus: 'stat',
            productPickedUp: 'true'
        }]
    })
    const [activeEvent, setActiveEvent] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const columns = [
        {
            Header: 'Product',
            accessor: 'productName'
        },
        {
            Header: 'Winning Bid Amount',
            accessor: 'productPrice',
        },
        {
            Header: 'Winner\'s Name',
            accessor: 'user',
        },
        {
            Header: 'Winner\'s Email',
            accessor: 'userEmail',
        },
        {
            Header: 'Winner\'s Phone #',
            accessor: 'phoneNumber',
        },
        {
            Header: 'Payment Status',
            columns: [
                {
                    Header: 'Current Status',
                    accessor: 'paymentStatus',
                },
                {
                    Header: 'Edit Status',
                    Cell: ({ original }) => (
                        <>
                        <Button variant="primary" onClick={handleShow}>
                        Launch demo modal
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            </Modal>
                        </>
                    )
                }
            ]
            
        },
        {
            Header: 'Product Collected',
            accessor: 'productPickedUp',
        }];

    useEffect(() => {
        //generateReportsForAuction()
        const unsubscribe = db
            .firestore()
            .collection('/AuctionEvent')
            .onSnapshot( (snapshot) => {
                if (snapshot.size) {
                    let arrAuctionData = [];
                    snapshot.forEach( (doc) => {
                        if(doc.get('isActive')) {
                            setActiveEvent(doc.id);
                            let x = createAuctionReport(doc.id);
                        }
                    });
                }
            });

        //generateReportsForAuction(activeEvent)
        //console.log(JSON.stringify(createAuctionReport(activeEvent)));
    }, []);

    return <ReportsTable columns={columns} data={data}/>
}

//Navigation and Page design.
const ReportsPage = () => {
    return (
        <div className="report-body">
            <AdminNav />
            <h2 className="text-center mx-auto space text-header">Reports</h2>
            <Container>
                <MyTable />
            </Container>
            <Footer />
            <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
        </div>
    )

}

export default ReportsPage;
