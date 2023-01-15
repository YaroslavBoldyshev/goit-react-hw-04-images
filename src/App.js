import "./App.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Button } from "./components/Button/Button";
import { Loader } from "./components/Loader/Loader";
import { Modal } from "./components/Modal/Modal";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const App = () => {
  const [keyword, setKeyword] = useState({ key: "" });
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [modalSrc, satModalSrc] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (keyword.key === "") {
      return;
    }
    setStatus("pending");
    fetchImages(keyword.key, page);
  }, [keyword, page]);

  const onSubmit = (key) => {
    if (!key) {
      Notify.info("Please enter search request");
    }
    setImages([]);
    setKeyword({ key });
    setPage(1);
    setStatus("idle");
  };

  const onLoadMore = () => {
    setPage((page) => page + 1);
  };

  const fetchImages = (keyword, page) => {
    fetch(
      `https://pixabay.com/api/?key=22812338-89cc7af62214fe881f61e5605&q=${keyword}&image_type=photo&page=${page}&per_page=12`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setStatus("rejected");

        return Promise.reject(new Error("oops"));
      })
      .then((p) => {
        if (p.hits.length === 0) {
          setStatus("rejected");
          Notify.info("Sorry we could find anything");
        }
        setImages((images) => [...images, ...p.hits]);
        setStatus("resolved");

        if (p.hits.length < 12) {
          setStatus("idle");
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("rejected");
      });
  };

  const openleModal = (src) => {
    satModalSrc(src);
  };

  const closeModal = () => {
    satModalSrc("");
  };

  return (
    <ImageFinder>
      <Searchbar onSubmit={onSubmit} />

      {status !== "rejected" && (
        <ImageGallery images={images} openleModal={openleModal} />
      )}

      {status === "pending" && <Loader />}

      {status === "resolved" && <Button onLoadMore={onLoadMore} />}

      {modalSrc && <Modal picture={modalSrc} closeModal={closeModal} />}
    </ImageFinder>
  );
};
export default App;

const ImageFinder = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
