const express = require('express')
const app = express()
const port = 5800
const request = require('request')
const usersource = process.env.USERS_URL||"http://localhost:5600";
const ordersource = process.env.ORDERS_URL||"http://localhost:5700";
var returnUser
var returnOrder
app.get('/orderdetails/1', (req, res) => {    
	request(usersource +'/user/1', { json: true }, (err, resp, body) => {
	  if (err || !body) {         
	  	  res.send("Error while getting user info from "+usersource) 
	  } else{       
        returnUser = body;   	
        request(ordersource + '/orders/1', { json: true }, (err, resp, body) => {
            if (err || !body) {
                res.send("Error while getting order info from " + ordersource);
            }
            else {                            
                returnOrder = body        
            }
        });	  
       
      }
    });

    res.send({
        "userDetails" : returnUser,
        "orders": returnOrder
    })
})


app.use(express.static('public'))

app.listen(port, () => console.log(`Listening on port ${port}!`))