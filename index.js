import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import { title } from "process";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const classValue = "disabled";
app.get("/", (req, res) => {
    res.render('homepage.ejs',{tempclass:classValue, title:title});
  });
app.post("/submit",(res,req)=>{
  const title = res.body.Title;
  const content = res.body.content;
  fs.writeFile('public/docs/title.txt', title, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('File has been saved successfully!');
  });
  fs.writeFile('public/docs/content.txt', content, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('File has been saved successfully!');
  });
  req.render('homepage.ejs',{tempclass:" ",
    title:title,
  });
})
app.get("/writeBlog",(res,req)=>{
  req.render('createPost.ejs');
})

app.get("/blog1",(res,req)=>{
  req.render('blog1.ejs');
})
app.get("/blog2",(res,req)=>{
  req.render('blog2.ejs');
})
app.get("/blog3",(res,req)=>{
  req.render('blog3.ejs');
})

app.get("/blog4", (req, res) => {
  fs.readFile('public/docs/title.txt', 'utf8', (err, title) => {
    if (err) {
      console.error("Error reading title file:", err);
      return res.status(500).send("Error reading title file");
    }

    fs.readFile('public/docs/content.txt', 'utf8', (err, content) => {
      if (err) {
        console.error("Error reading content file:", err);
        return res.status(500).send("Error reading content file");
      }

      console.log(title);
      console.log(content);

      res.render('newblog.ejs', { blogtitle: title, blogtext: content });
    });
  });
});
app.post("/edit",(res,req)=>{
  const content = res.body.blogarea;
  const title = res.body.Title;
  console.log(title);
  fs.writeFile('public/docs/content.txt', content, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    console.log('File has been saved successfully!');
  });
  req.render('homepage.ejs',{tempclass:" ",
    title:title,
  });
})
  
app.listen(process.env.port||port,()=>{
    console.log(`Port is listening at Server ${port}`);
})