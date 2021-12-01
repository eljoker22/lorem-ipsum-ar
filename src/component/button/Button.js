import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';

export const ButtonDefault = styled(Button)`
    background: var(--primary-color);
    &:hover{
        background: var(--primary-color);
    }
`;
export const ButtonRoute = styled(Button)`
    font-size: 25px;
    font-weight: 600;
    margin: 15px;
    padding: 5px 25px;
`;
export const ButtonGenirate = styled(Button)`
        width: 19%;
        font-size: 18px;
        font-weight: 600;
        background: var(--primary-color);
        &:hover{
            background: var(--primary-color);
        }
    `;

export const ButtonCopy = styled(Button)`
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    background: var(--primary-color);
    &:hover{
        background: var(--primary-color);
    }
`;