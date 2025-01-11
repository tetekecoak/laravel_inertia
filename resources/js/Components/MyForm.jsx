import React from 'react';
import { TextInput, Label ,Select, Textarea} from 'flowbite-react';  // Assuming you're using Flowbite for the UI


const FormInput = ({ id, width ="max-w-xl" , label, color = "base",value ="", onChange,required = false, error, placeholder , type = "text" , ...props}) => {
    return (
        <div className='min-w-max'>
            {label && (<div className="mb-2 block">
                <Label htmlFor={id} value={label+" "+(required ? "*" : "")} />
            </div>)}
            
            <TextInput
                className={width}
                {...props}
                id={id}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                color={error ? 'failure' : color}
                helperText={error && <span className="font-medium">{error}</span>}
            />
        </div>
    );
};

const FormSelect = ({ id, width ="max-w-xl" , label, color = "base",value="", onChange,required = false, error , type = "text" , children, ...props}) => {
    return (
        <div className='min-w-max'>
            {label && (<div className="mb-2 block">
                <Label htmlFor={id} value={label+" "+(required ? "*" : "")} />
            </div>)}

             <Select {...props}         id={id}
                className={width}
                value={value}
                onChange={onChange}
                helperText={error && <span className="font-medium">{error}</span>}
                color={error ? 'failure' : color}
                 >
                    {children}
             </Select>
        
        </div>
    );
};


const FormTextArea = ({ id, width ="max-w-xl" , label, color = "base",value="", onChange,required = false, error , type = "text" , children, ...props}) => {
    return (
        <div className='min-w-max'>
            {label && (<div className="mb-2 block">
                <Label htmlFor={id} value={label+" "+(required ? "*" : "")} />
            </div>)}
            <Textarea {...props}    id={id}
                className={width}
                value={value}
                onChange={onChange}
                helperText={error && <span className="font-medium">{error}</span>}
                color={error ? 'failure' : color}
            />
        
        </div>
    );
};


export {FormInput, FormSelect, FormTextArea};
