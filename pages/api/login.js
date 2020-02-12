/**
 * This is a function that takes in a request and a response as a parameter
 */


export default (req, res) => {

    //when user submits credentials through form - uses post
    if(req.method === 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ token: "back-end token here - user submitted the following data " + req.body.email + ' and ' + req.body.password }));
    } else {
        console.log(res);
        console.log('in else at api/login');
    }
    
};