require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const userCtrl = require('./controllers/user.js');

var app = express();

const port=process.env.PORT|| 3000;

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'index', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


const upload = require('express-fileupload');

app.use(upload());


app.get('/',function(req,res){
  res.sendFile(__dirname+'/views/user/edit.hbs');
})
console.log(__dirname)
app.post('/upload',function(req,res){
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/uploads/' + name;
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
        res.send("Error Occured!")
      }
      else {
        console.log("File Uploaded",name);
        app.use('/user', userCtrl);
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})

app.use('/user', userCtrl);

app.listen(port, () => {
    console.log('server is up on port '+ port);
});
