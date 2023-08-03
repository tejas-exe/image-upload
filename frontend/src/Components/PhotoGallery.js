import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useMediaQuery } from "@mui/material";
export default function PhotoGallery({ imgGallery }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const columns = isSmallScreen ? 2 : 4;
  return (
    <ImageList
      sx={{ width: "95%", height: "89vh", margin: "auto" }}
      rowHeight={300}
      cols={columns}
    >
      {imgGallery.map((item) => (
        <ImageListItem key={Math.round(Math.random() * 10000)}>
          <img
            src={`${item.imgURL}?w=250&h=300&fit=crop&auto=format`}
            alt={item.title}
          />
          <ImageListItemBar title={item.title} subtitle={item.author} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
