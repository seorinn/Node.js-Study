const express = require('express');
const app = express()
const port = 3000;
const userRouter = require('./routes/user');
const goodsRouter = require('./routes/goods');
const mongoose = require('mongoose');
//const serverSelectionError = new ServerSelectionError();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
    let name = req.query.name;
    res.render('test', {name});
})

app.use('/goods', goodsRouter);
app.use('/user', userRouter);

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('<!DOCTYPE html>\
    <html lang="en">\
    <head>\
        <meta charset="UTF-8">\
        <meta http-equiv="X-UA-Compatible" content="IE=edge">\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <title>Document</title>\
    </head>\
    <body>\
        Hi. I am with html<br>\
        <a href="/hi">Say Hi!</a>\
    </body>\
    </html>')
})
app.get('/hi', (req, res) => {
    res.send('Hi. This is espress router')
})

app.listen(port, () => {
    console.log('listening at http://localhost:${port}')
})

app.get('/home', (req, res) => {
    res.render('index');
})

mongoose.set('strictQuery', false);

app.get('/mongodb', async(req,res) => {
    await mongoose.connect('mongodb://localhost/voyage', {
        //userNewUrlParser: true,
        //useUnifiedTopology: true,
        //useFindAndModify: true,
        //useCreateIndex: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

    res.send('ok');
})
/*
app.get('/mongodb', async (req, res) => {
    await mongoose.connect('mongodb://localhost/voyage', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
    
    const { Schema } = mongoose;
    const goodsSchema = new Schema({
    goodsId: {
    type: Number,
    required: true,
    unique: true
    },
    name: {
    type: String,
    required: true,
    unique: true
    },
    thumbnailUrl: {
    type: String
    },
    category: {
    type: String
    },
    price: {
    type: Number
    }
    });
    let Goods = mongoose.model("Goods", goodsSchema)
    await Goods.create({
    goodsId: 1,
    name: "맛있는 저녁",
    thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRQ3NDs5bjulPr3JaXJzP7DH3Y71WX9wzQ7N8XD9KLUHjT6L&usqp=CAc",
    category: "food",
    price: 15000
    });

    res.send('ok');
    })*/