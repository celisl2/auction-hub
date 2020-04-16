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
import HomeForbidden from '../components/HomeForbidden';
let db = loadDB();

const ReportsTable = ({columns, data, userData}) => {
    console.log(data)
    console.log(userData)

    const parseData = () => {
        let tableData = [];
        data.map((item) => {
            tableData.push({
                productName: item.productName
            })

        })
        return tableData;
    }
    let d = parseData();
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        userData
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
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [activeId, setActiveId] = useState(() => {
        let myId = '';
        db.firestore().collection('AuctionEvent')
            .where('isActive', '==', true)
            .get().then((doc) => {
                if(doc.size) {
                    console.log(doc.docs[0].id)
                    myId = doc.docs[0].id;;
                    return doc.docs[0].id;
                }
            })
            return myId
    })
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
        var unsubscribe = db.firestore().collection('Reports')
            .onSnapshot((querySnapshot) => {
                let arrReport = [];
                let usr = [];
                querySnapshot.forEach((doc) => {
                    //get user info

                    db.firestore().collection('Users').doc(doc.data().userID)
                        .get().then((userDoc) => {
                            usr.push(userDoc.data());
                        })

                            console.log('here')
                            arrReport.push(doc.data())

                })

                setData(arrReport);
                setUserData(usr);
            })
    }, [db])
    if(data.length !== 0) {
        return <ReportsTable columns={columns} data={data} userData={userData}/>
    }
    else {
        return <p>loading</p>
    }
}

//Navigation and Page design.
const ReportsPage = () => {
    const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState([]);
    useEffect( () => {
        db.auth().onAuthStateChanged((user) => {
            const unsubscribe = db
                .firestore()
                .collection("/Users")
                .doc(user.uid)
                .get()
                .then((querySnapshot) => {
                    setCurrentUserIsAdmin(querySnapshot.data().isAdmin);
               });
        });
    }, [db] );

    if(currentUserIsAdmin == "true") {
        return (
            <div className="report-body">
                <AdminNav />
                <Container>
                <h2 className="text-center mx-auto space text-header">Reports</h2>
                </Container>
                <MyTable />
                <Footer />
                <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
            </div>
        );
    } else if (currentUserIsAdmin == "false") {
        return (
            <HomeForbidden />
        );
    } else {
        return null;
    }
}

export default ReportsPage;
