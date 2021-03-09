import {useState} from 'react';
import {capitalizedFirst} from './../utils/capitalizedFirst';

export const UseForm=(initialState={})=>{
    const [values,setValues]= useState(initialState);

    const reset= ()=>{
        setValues(initialState);
    }

    const handleInputChange=({target})=>{
            setValues({
                ...values,
                [target.name]:capitalizedFirst(target.value)
            });
    }


    const setNewState=(newState={}) =>{
        setValues({...newState});
    }

    return [values,handleInputChange,reset,setNewState];

}