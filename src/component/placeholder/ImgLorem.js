import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import {ButtonGenirate} from '../button/Button'
import classes from './img-lorem.module.css';
import Slide from '@mui/material/Slide';
import PopupImg from '../popup/Popup'

function ImgLorem() {
    const [query, setQuery] = useState('');
    const [imgNum, setImgNum] = useState(10);
    const [images, setImages] = useState([]);
    const [selectImg, setSelectImg] = useState(null);
    const [error, setError] = useState('');
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const getImages = async () => {
        if (query.length === 0 || imgNum === 0) {
            return;
        }
        try{
            setLoading(true);
            //const apiKey = '88d11432c05a44262e6c720fe5799eec';
            const imgsurl = [];
            const response = await axios({
                method: 'Get',
                url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=88d11432c05a44262e6c720fe5799eec&tags=${query}&per_page=${imgNum}&format=json&nojsoncallback=1`
                
            })
            
            const dataArr = response.data.photos.photo;
            dataArr.forEach((img) => {
                imgsurl.push(`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_b.jpg`);
            })
            imgsurl.length == 0 ? setError('لاتوجد نتائج.') : setError(''); 
            setImages(imgsurl)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getImages();
        setImages([]);
    }

    //console.log(selectImg)

    return(
        <>
        <form onSubmit={handleSubmit}>
            <div className={classes.loremCont}>
                <input 
                type="text"
                name="search" 
                placeholder="ابحث عن صور..." 
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                />
                <input type="number" value={imgNum}  onChange={(e) => setImgNum(e.target.value)} />
                <ButtonGenirate type="submit" variant="contained">توليد الصور</ButtonGenirate>
            </div>
        </form>
        <ImageList variant="masonry" cols={3} gap={8}>
        {images.length > 0 &&
            images.map((img) => {
                return <ImageListItem key={img}>
                    <img 
                        className={classes.imgGallery}
                        src={img}
                        srcSet={img}
                        alt="jo"
                        loading="lazy"
                        onClick={() => {
                            setSelectImg(img);
                            setPopup(true);
                        }}
                    />
                </ImageListItem>
            })
        }
        </ImageList>
        {!loading && error.length > 0 && <p>{error}</p>}
        {loading && <CircularProgress style={{color: 'var(--primary-color)', width: '50px', height: '50px'}} />}
        {popup && selectImg && <PopupImg imgurl={selectImg} open={popup} setOpen={setPopup}  />}
        </>
    )
}
export default ImgLorem;