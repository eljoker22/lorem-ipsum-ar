import React, {useEffect, useState} from 'react'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './lorem.module.css';
import { ButtonCopy, ButtonGenirate } from '../button/Button'
import useMediaQuery from '@mui/material/useMediaQuery'

function LoremIpsum() {
    const mediaQuery = useMediaQuery('(max-width: 576px)');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [numFilter, setNumFilter] = useState(5);
    const [typeFilter, setTypeFilter] = useState('pr');
    const [tooltip, setTooltip] = useState(false);
    const [loading, setLoading] = useState(false);
    const wordsInPargraph = 50;

    const getData = async () => {
        if (query.length < 1) {
            return;
        }
        setLoading(true);
        try{
            const response = await axios({
                method: 'GET',
                url: `https://ar.wikipedia.org/w/api.php?format=json&action=query&utf8&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles=${query}`,
            })
            const resData = response.data.query.pages;
            const pageId = Object.keys(resData)[0];
            const page = resData[pageId];

            // calculate length pragraph && words
            
                const textWithoutN = page.extract ? page.extract.replaceAll('\n', ' ') : setError('لاتوجد نتائج حاول مجددا.');
                const reg = /[\d]/g
                const textArr = textWithoutN.split(' ');
                
                if (numFilter > 0 && typeFilter == 'wo') {
                    let firstRes = textArr.slice(0, numFilter);
                    let emptyRes = firstRes.filter(v => reg.test(v));
                    let numOfPlus = (parseInt(numFilter) + emptyRes.length);
                    let finalRes = textArr.slice(0, numOfPlus);
                    let convertToString = finalRes.join(' ');
                    setResult(convertToString);
                }else if (numFilter > 0 && typeFilter == 'pr') {
                    let numRequired = (parseInt(numFilter) * wordsInPargraph);
                    console.log(numRequired)
                    if (numRequired > textArr.length) {
                        let avreg = Math.ceil(numRequired / textArr.length);
                        console.log(avreg);
                        const duplicatArr = [].concat(... new Array(avreg).fill(textArr));
                        let pragraphRes = duplicatArr.slice(0, numRequired);
                        setResult(pragraphRes.join(' '));
                        console.log(duplicatArr)
                    }else{
                        let resultPr = textArr.slice(0, numRequired);
                        let pragraphRes = resultPr.join(' ');
                        setResult(pragraphRes);
                        console.log(resultPr)
                    }
            }

            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getData();
    }

    const copyText = () => {
        navigator.clipboard.writeText(result).then(() => {
            setTooltip(true);
        })
        setTimeout(() => {
            setTooltip(false)
        }, 2000);
    }

    useEffect(() => {
        // 
    }, [])


    return(
        <>
        <div className={classes.loremCont}>
            <form onSubmit={handleSubmit}>
                <>  
                    <div className={classes.searchCont}>
                        <input 
                        className={classes.inputSearch} 
                        type="text" 
                        name="search" 
                        placeholder="ابحث عن اى موضوع..." 
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                        />
                        <SearchIcon className={classes.icon} />
                    </div>
                    <div className={classes.inputsFlex}>
                        <input 
                        type="number" 
                        className={classes.inputNumber} 
                        value={numFilter} 
                        onChange={(e) => setNumFilter(e.target.value)} />
                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="pr">فقرات</option>
                        <option value="wo">كلمات</option>
                        </select>
                        <ButtonGenirate
                            type="submit" 
                            variant="contained"
                            fullWidth={mediaQuery ? true : false}
                            style={{marginTop: '10px', display: 'block'}}>
                                توليد النص
                        </ButtonGenirate>
                    </div>
                    <div className={classes.resultCont}>
                        <div className={classes.textCont}>
                            {result.length > 0 && !loading ? <p id="text">{result}</p> 
                            : loading ? 
                            <CircularProgress style={
                                {
                                color: 'var(--primary-color)', 
                                width: '50px', 
                                height: '50px',
                                marginTop: '60px'
                                }} /> 
                            : ''}
                            {error.length > 0 && <p>{error}</p>}
                        </div>
                    </div>
                    <ButtonCopy variant="contained" style={{position: "relative"}} onClick={copyText}>
                        نسخ
                        <div className={classes.tooltip} style={{visibility: tooltip ? 'visible' : 'hidden', opacity: tooltip ? '1' : '0'}}>تم النسخ</div>
                    </ButtonCopy>
                </>
            </form>
        </div>
        </>
    )
}
export default LoremIpsum;