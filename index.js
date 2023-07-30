const express = require('express');
const app = express();
const path=require('path');
const methodOverride = require('method-override')

const {v4 : uuidv4} = require('uuid');
uuidv4();

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use('/public', express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))

var comments = [
    {
        id:uuidv4(),
        username:'raula016',
        com:'I am an Odiya.'
    },
    {
        id:uuidv4(),
        username:'soulsteel',
        com:'I do not like react.'
    },
    {
        id:uuidv4(),
        username:'kaushiki07',
        com:'Mujhe ye nahi karna hai.'
    },
    {
        id:uuidv4(),
        username:'utkarsh07',
        com:'TWSS.'
    },
    {
        id:uuidv4(),
        username:'bhavya12',
        com:'I do not like AC.'
    },
    {
        id:uuidv4(),
        username:'symarc08',
        com:'This place offers good food.'
    },
    {
        id:uuidv4(),
        username:'brunhilde',
        com:'The food of this place can be better.'
    }
];

app.get('/comments', (req,res)=>{
    const {id}=req.params
    res.render('display',{comments,id:uuidv4()})
});

app.get('/comments/new',(req,res)=>{
    res.render('crenew')
});

app.get('/comments/update',(req,res)=>{
    res.render('update')
});

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params
    const com=comments.find(c=>c.id ===id)
    res.render('show',{com,id})
});

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params
    const com=comments.find(c=>c.id ===id)
    res.render('edit',{com,id})
})

app.post('/create',(req,res)=>{
    const {username, com}=req.body;
    comments.push({username, com, id: uuidv4()})
    res.redirect('/comments')
});

app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params
    const newcommentText = req.body.com
    const foundcom = comments.find(c=>c.id===id)
    foundcom.com=newcommentText
    res.redirect('/comments')
})
app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params
    comments = comments.filter (c=>c.id!==id)
    res.redirect('/comments')
})

app.listen(3000,()=>{
    console.log("Listening on port...")
});