/*

File Name: reports.js
Purpose: Displays data for auction events
Document Created By: Team 1

*/

import AdminNav from '../components/AdminNav';
import Footer from '../components/Footer';
import {getCode} from '../utils/helperFunctions';
import {useMemo} from 'react';
import { useTable } from 'react-table';

const Table = () => {

    return (
        <div>

        </div>
    )
}

//Navigation and Page design.
const ReportsPage = () => {
    return (
        <div className="report-body">
            <AdminNav />
            <h2 className="text-center mx-auto space text-header">Reports</h2>
            <Footer />
            <p className='copyright'>{getCode(169) + ' ' + new Date().getFullYear()} All Things Possible Medical Fundraising</p>
        </div>
    )

}

export default ReportsPage;
