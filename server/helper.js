const mongo = require('mongodb').MongoClient;
const url = 'mongodb://ec2-54-153-90-74.us-west-1.compute.amazonaws.com:27017'
// let collection;
let db;

mongo.connect(url,{ useNewUrlParser: true}, (err, client) => {
    if (err) {
      console.error(err)
      return
    } else {
        db = client.db('morelooks')
    }
  })

function dbHelpers (querystring, num = 9500000){
  return new Promise ((resolve, reject) => {
    db.collection('products').findOne({_id: { $gt: num } , itemtype: querystring}, (err, items) => {
      if (err){
        reject({hello: 'hello world',...err});
      } else {
        resolve(items)
      }
    })
  })
}

function postHelper(){
  return new Promise ((resolve, reject) => {
    db.collection('products').find({},{_id:1}).sort({_id:-1}).limit(1).toArray(({}, (err, num) => {
      if (err){
        reject({hello: 'hello world',...err});
      } else {
        db.collection('products').insert({
          "productname": "Bernelle Mule",
          "imageurl": [
            "https://s3-us-west-1.amazonaws.com/fec-nordstrom-images/shoes/shoe1/a758ba8d-3595-4557-9d49-6029a1626e4c.jpeg",
            "https://s3-us-west-1.amazonaws.com/fec-nordstrom-images/shoes/shoe1/6fddc649-4738-4674-b261-5e2157822540.jpeg",
            "https://s3-us-west-1.amazonaws.com/fec-nordstrom-images/shoes/shoe1/a3b1d9af-4d6c-4200-9158-ea39ed284d29.jpeg"
          ],
          "shoesizes": [
            6,
            7,
            8
          ],
          "designer": "ACNE STUDIO",
          "price": 480,
          "color": [
            "black"
          ],
          "itemtype": "shoe",
          "description": "A leather strap design gives a cute signature statement on a slide sandal with a lightly cushioned footbed.",
          "_id": num[0]._id+1
        }, (err, data)=>{
          if (err){
            reject(err)
          } else {
            resolve('insert success!')
          }
        })
      }
    }))
  })
}
// db.products.find({},{_id:1}).sort({_id:-1}).limit(1)
module.exports.get = dbHelpers;
module.exports.post = postHelper;
