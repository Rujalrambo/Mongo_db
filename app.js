const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb , getDb } = require('./db')
// init app & middleware
const app = express()
app.use(express.json())

// db.connection
let db 

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
        console.log('app listening on port 3000');
    });
       db = getDb()
    }
})

// routes
app.get('/sites',(req, res) =>{
//current page

    let sites =[]

    db.collection('sites') //db.Sites
    .find() // cursor toArray forEach
    .sort({Name : 1})
    .forEach(site => sites.push(site))
    .then(() => {
        res.status(200).json(sites)
    })
    .catch(() => {
        res.status(500).json({error:'Could not fetch the documents'})
    })
//    res.json({mssg:"welcome to api"})
})
app.get('/sites/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
      // If the ObjectId was successfully created, proceed with the query
      
      db.collection('sites')
      .findOne({ _id: new ObjectId(req.params.id)})  
        .then(doc => {
          res.status(200).json(doc)
        })
        .catch(err =>{
            res.status(500).json({ error: 'Document not found' });
        })
    } else{
        res.status(500).json({error: 'could not find the data'})
    }
})

  
// app.get('/sites/:id', (req, res) => {
//   try {
//     const objectId = new ObjectId(req.params.id);

//     if (objectId) {
//       const doc = db.collection('sites').findOne({ _id: objectId });

//       if (doc) {
//         res.status(200).json(doc);
//       } else {
//         res.status(404).json({ error: 'Document not found' });
//       }
//     } else {
//       res.status(500).json({ error: 'Could not fetch the document' });
//     }
//   } catch (error) {
//     console.error('Invalid ObjectId format:', error);
//     res.status(422).json({ error: 'Invalid ObjectId format' });
//   }
// });

app.post('/sites',(req,res) =>{
    const site = req.body

    db.collection('sites')
        .insertOne(site)
        .then(result => {
            res.status(201).json(result)
        })
        .catch((err)=>{
            res.status(500).json({err: 'Could not fetch the doc'})
        })
})
app.delete('/sites/:id', (req,res)=>{
    if (ObjectId.isValid(req.params.id)) {
        db.collection('sites')
          .deleteOne({_id: new ObjectId(req.params.id)})
          .then(result =>{
              res.status(200).json(result)
          })
          .catch(err => {
              res.status(500).json({error:'Could not delete the docutment'})
          })
      }else{
          res.status(500).json({error:'Not a vaild doc id'})
      }
})

app.patch('/sites/:id', (req,res)=> {
    const updates = req.body;

    if (ObjectId.isValid(req.params.id)) {
        db.collection('sites')
          .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
          .then(result =>{
              res.status(200).json(result)
          })
          .catch(err => {
              res.status(500).json({error:'Could not uodate the docutment'})
          })
      }else{
          res.status(500).json({error:'Not a vaild doc id'})
      }
})