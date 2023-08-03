import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase Config/fireBaseConfig";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function FormDialog({ imgGetter }) {
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState(false);
  const handleClickOpen = () => {
    imgGetter(false);
    setOpen(true);
  };

  const handleClose = () => {
    imgGetter(true);
    setOpen(false);
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const storageRef = ref(
        storage,
        `images/img${Math.floor(Math.random() * 10000)}.jpg`
      );
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log("===>", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setUrl(downloadURL);
          });
        }
      );
    }
  };

  const postImage = () => {
    if (title && url) {
      const urlReq = "http://localhost:3001/upload";
      const data = {
        title: title,
        imgURL: url,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(urlReq, data, config)
        .then((response) => {
          console.log("Response:", response.data);
          imgGetter(true);
          handleClose();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        endIcon={<CloudUploadIcon />}
        onClick={handleClickOpen}
      >
        Upload Image
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tite of your Photo"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Button
            fullWidth
            variant="contained"
            component="label"
            disableElevation
            color="error"
            endIcon={<CloudUploadIcon />}
          >
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleImageUpload}
            />
          </Button>
          <LinearProgress variant="determinate" value={progress} />

          {err && (
            <Box sx={{ marginTop: "5px", textAlign: "center", color: "red" }}>
              please fill all the details
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postImage}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
