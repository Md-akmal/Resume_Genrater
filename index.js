const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const multer = require('multer');
let selectedTemplate;
let personalFormData;
let educationFormData;
let experienceFormData;
let skillFormData;
let summaryFormData;
let userImg;
const public = path.join(__dirname, 'public');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(public));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage});
//const upload = multer({ dest: 'uploads/' });

// Render the form
app.get('/', (req, res) => {
  res.send('hello');
});
app.get('/template', (req, res) => {
  res.render('templates')
})
app.post('/select-template', (req, res) => {
  selectedTemplate = req.body.template;
  //console.log(selectedTemplate)
  // Render the form based on the selected template
  res.render('forms/personal', { template: selectedTemplate });
});
app.post('/personal-data', upload.single("userImage"), (req, res) => {
  userImg = req.file;
  personalFormData = req.body;
  res.render('forms/experience');
});
app.post('/experience-data', (req, res)=>{
  experienceFormData = req.body;
  res.render('forms/education');
})
app.post('/education-data', (req, res)=>{
  educationFormData = req.body;
  res.render('forms/skill')
})
app.post('/skill-data', (req, res)=>{
  skillFormData = req.body;
  res.render('forms/summary');
})
app.post('/summary-data', (req, res)=>{
  summaryFormData = req.body;
  res.render(`template/${selectedTemplate}`, {
    personalFormData,
    experienceFormData,
    educationFormData,
    skillFormData,
    summaryFormData,
    userImg
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
