import { useState } from "react";

function App() {
  return (
    <div style={{background: "#dfe6e9", height: "100vh" }}>
      <ToggleMessage />
      <ToggleMessage />
      <ToggleMessage />
    </div>
  )
}

// the component isnt re-rendering
// because we havent used a state variable

const ToggleMessage = () => {
  let [isVisible, setVisible] = useState(true);

  console.log("re-render");
  function toggle() {
   setVisible(!isVisible);
  }

  return (
      <div>
          <button onClick={toggle}>
              toggle Message
          </button>
          {isVisible && <p>this message is conditionally rendered</p>}
      </div>
  );
};
export default App;

//to upload and generate a specific unique link to download files
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname); // unique-name.ext
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/download/${req.file.filename}`;
  res.status(200).json({ fileUrl }); // Send the unique download link
});
