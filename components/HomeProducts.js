import {loadDB} from './../lib/db';
import React, { useState, useEffect } from 'react';

let db = loadDB();

export default () => {
    const [productData, setProductData] = useState([]);

    return (
        <div className="home-products-body" id="products">
            <div className="home-products">
                {/* logic here to display all products */}
            </div>
        </div>
    )
    
};
