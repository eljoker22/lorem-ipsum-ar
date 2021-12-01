import React, {useState} from 'react';
import {ButtonCopy} from '../button/Button'
import classes from './popup.module.css';
import classTooltip from '../lorem/lorem.module.css';
function PopupImg({imgurl ,setOpen, open}) {
    const [tooltip, setTooltip] = useState(false);

const copyLink = () => {
    navigator.clipboard.writeText(imgurl).then(() => {
        setTooltip(true);
    })
    setTimeout(() => {
        setTooltip(false);
    }, 2000)
}

    return(
        <>

        <div className={classes.popupContainer}>
            <div className={classes.overlay} onClick={() => setOpen(false)}></div>
            <div className={classes.popup}>
                <img src={imgurl} alt="" />
                <hr />
                <ButtonCopy variant="content" onClick={copyLink}>
                    copy
                <div className={classTooltip.tooltip} style={{visibility: tooltip ? 'visible' : 'hidden', opacity: tooltip ? '1' : '0'}}>تم النسخ</div>
                </ButtonCopy>
            </div>
        </div>

        </>
    )
}
export default PopupImg;