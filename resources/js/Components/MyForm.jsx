import React from 'react';
import PhoneInput from "react-phone-input-2";

import { TextInput, Label ,Select, Textarea, HelperText} from 'flowbite-react';  // Assuming you're using Flowbite for the UI


            const FormPhone = ({ id, width ="max-w-xl" , label, color = "base",value ="", onChange,required = false, error, placeholder  , ...props}) => {
                return (
                    <div className='min-w-max mt-2'>
                        <PhoneInput
                            {...props}
                            country={"id"} // Negara default
                            specialLabel={label}
                            value={value} // Nomor telepon
                            onChange={onChange} // Handler perubahan
                            containerClass='text-sm font-medium text-base-700 dark:text-base-300'
                            placeholder={ placeholder ?? '+62 8123 4567 898'}
                            disableDropdown
                            defaultMask='... .... ....'
                            enableLongNumbers={15}
                            alwaysDefaultMask
                            inputClass={error ? 
                                "border-red-500 py-[10px]  text-sm mt-2 mb-2 shadow-sm block w-full border dark:bg-base-900 disabled:cursor-not-allowed disabled:opacity-50 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-500 dark:focus:ring-red-500 rounded-md" : 
                                "block rounded-md py-[10px] text-base-500 mt-2 text-sm mb-2 w-full border disabled:cursor-not-allowed disabled:opacity-50 border-base-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-base-700 dark:bg-base-900 dark:text-base-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                              }
                            dropdownClass='border border-base-200 bg-white text-base-900 dark:border-none dark:bg-base-700 dark:text-white'
                        />
                        {error && <HelperText color='failure'><span className="font-medium">{error}</span></HelperText>}

                    </div>
                );
            };

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


export {FormInput, FormSelect, FormTextArea, FormPhone};
