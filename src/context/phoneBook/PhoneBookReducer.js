export const types ={
    startLoading:'[PhoneBook] loading ',   
    finishLoading:'[PhoneBook] loading',
    setPhoneBooks:'[PhoneBook] set Phonebooks ',   
    setSelectedPhoneBook:'[PhoneBook] set Phonebook ', 
    addPhoneBook:'[PhoneBook] add Phonebook ', 
    updatePhoneBook:'[PhoneBook] update Phonebook ', 
    deletePhoneBook:'[PhoneBook] delete Phonebooks ',   
    setMessageError:'[PhoneBook] set messageError  ',   
    resetMessageError:'[PhoneBook] reset messageError  ',   
    
}

export const initialState={
    phoneBooks:[],
    selectedPhoneBook:{_id:'',firstName:'',lastName:'',phone:'',createdAt:'',updatedAt:''},
    loading:false,
    messageError:null
}

export const PhoneBookReducer=(state=initialState,action)=>{

    switch (action.type) {
        case types.startLoading:{
            return {...state,loading:true, messageError:null};
        }
        case types.finishLoading:{
            return {...state,loading:false};
        }

        case types.setMessageError:{
            return {...state,messageError:action.payload};
        }
        case types.resetMessageError:{
            return {...state,messageError:null};
        }
    
        case types.setPhoneBooks:{
            return {...state,phoneBooks:[...action.payload]};
        }

        case types.setSelectedPhoneBook:{
            return {...state,selectedPhoneBook:{...action.payload}};
        }

        case types.addPhoneBook:{
            return {...state,phoneBooks:[action.payload,...state.phoneBooks]};
        }
        case types.updatePhoneBook:{

            const newState= state.phoneBooks.map(phoneBook=>{
                if(phoneBook._id===action.payload._id){
                    phoneBook= action.payload;
                }
                return phoneBook;
            });

            return {...state,phoneBooks:[...newState]};
        }

        case types.deletePhoneBook:{
            return {...state,phoneBooks:state.phoneBooks.filter(pb=>pb._id!==action.payload)};
        }

        default:{
            return state;
        }
    }
}