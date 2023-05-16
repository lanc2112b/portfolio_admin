import { useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { toast } from "react-hot-toast";
import { MessageContext } from "../../contexts/Message";
import { postPortfolioItem, patchPortfolioItem } from "../../api/ApiConsumer";
import SpinnerSmall from "../uiparts/SpinnerSmall";
import Bread from "../uiparts/Bread";

const PortfolioForm = ({ expanded, setListHandler, useMode, id, formParts, setFormParts, loading }) => {

    const { user } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    const [apiError, setApiError] = useState(false);

    const initial = formParts ? formParts : {
        title: '',
        description: '',
        hosted_url: '',
        github_url: '',
        image_url: '',
        video_url: '',
    };

    const [formObj, setFormObj] = useState(initial);

    const resetHandler = () => {
        setFormObj(initial);

        setFormErrors({
            title: null,
            description: null,
            hosted_url: null,
            github_url: null,
            image_url: null,
            video_url: null,
            formErrors: null,
        });
    };

    const [formErrors, setFormErrors] = useState({
        title: null,
        description: null,
        hosted_url: null,
        github_url: null,
        image_url: null,
        video_url: null,
        formErrors: null,
    });

    const changeHandler = (event) => {
        
        const { name, value } = event.target;

        validateFormItem(name, value);

        setFormObj((currentObj) => { return { ...currentObj, [name]: value } });

    }
    
    function validateFormItem(name, value) {
        
        if (name === 'title') {

            setFormErrors((currErrs) => { return { ...currErrs, title: '' } });

            if (!value) {
                setFormErrors((currErrs) => { return { ...currErrs, title: 'Title is required' } });
                
            } else {

                if (value.length > 0 && value.length < 6) {
                    setFormErrors((currErrs) => { return { ...currErrs, title: 'Title must have more than 6 characters' } });
                }

                if (value.length > 255) {
                    setFormErrors((currErrs) => { return { ...currErrs, title: 'Title must have less than 255 characters' } });
                }
            }
        }

        if (name === 'description') {

            setFormErrors((currErrs) => { return { ...currErrs, description: '' } });

            if (!value) {
                setFormErrors((currErrs) => { return { ...currErrs, description: 'Description is required' } });

            } else {

                if (value.length > 0 && value.length < 20) {
                    setFormErrors((currErrs) => { return { ...currErrs, description: 'Description must have more than 20 characters' } });
                }

                if (value.length > 15000) {
                    setFormErrors((currErrs) => { return { ...currErrs, description: 'Description must have less than 15000 characters' } });
                }
            }
        }

        if (name === 'hosted_url') {

            setFormErrors((currErrs) => { return { ...currErrs, hosted_url: '' } });

            if (!value) {
                setFormErrors((currErrs) => { return { ...currErrs, hosted_url: 'A URL is required' } });

            } else {

                if (value.length > 0 && value.length < 10) {
                    setFormErrors((currErrs) => { return { ...currErrs, hosted_url: 'URL must have more than 10 characters' } });
                }

                if (value.length > 255) {
                    setFormErrors((currErrs) => { return { ...currErrs, hosted_url: 'URL must have less than 255 characters' } });
                }

                if (!/^(http(s?):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(value)) {
                    setFormErrors((currErrs) => { return { ...currErrs, hosted_url: 'URL must be valid' } });
                }
            }
        }

        if (name === 'github_url') {

            setFormErrors((currErrs) => { return { ...currErrs, github_url: '' } });

            if (value) {

                if (value.length > 0 && value.length < 10) {
                    setFormErrors((currErrs) => { return { ...currErrs, github_url: 'URL must have more than 10 characters' } });
                }

                if (value.length > 255) {
                    setFormErrors((currErrs) => { return { ...currErrs, github_url: 'URL must have less than 255 characters' } });
                }

                if (!/^(http(s?):\/\/)([-a-z0-9]{1,6}\.)?github\.com\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(value)) {
                    setFormErrors((currErrs) => { return { ...currErrs, github_url: 'URL must be a valid GitHub URL' } });
                }
            }
        }
        
        if (name === 'image_url') {

            setFormErrors((currErrs) => { return { ...currErrs, image_url: '' } });

            if (!value) {

                setFormErrors((currErrs) => { return { ...currErrs, image_url: 'A URL is required' } });

            } else {

                if (value.length > 0 && value.length < 10) {
                    setFormErrors((currErrs) => { return { ...currErrs, image_url: 'URL must have more than 10 characters' } });
                }

                if (value.length > 255) {
                    setFormErrors((currErrs) => { return { ...currErrs, image_url: 'URL must have less than 255 characters' } });
                }

                if (!/^(http(s?):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(jpg|jpeg|png|webp)$/g.test(value)) {
                    setFormErrors((currErrs) => { return { ...currErrs, image_url: 'URL must be a valid image resource' } });
                }
            }
        }

        if (name === 'video_url') {

            setFormErrors((currErrs) => { return { ...currErrs, video_url: '' } });

            if (value) {

                if (value.length > 0 && value.length < 10) {
                    setFormErrors((currErrs) => { return { ...currErrs, video_url: 'URL must have more than 10 characters' } });
                }

                if (value.length > 255) {
                    setFormErrors((currErrs) => { return { ...currErrs, video_url: 'URL must have less than 255 characters' } });
                }

                if (!/^(http(s?):\/\/)([-a-z0-9]{1,6}\.)?(youtube\.com|youtu.be)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(value)) {
                    setFormErrors((currErrs) => { return { ...currErrs, video_url: 'URL must be a valid YouTube URL' } });
                }
            }
        }

    }

    const formHandler = (event) => {

        event.preventDefault();

        const token = user.access_token;

        setFormErrors((currentObj) => { return { ...currentObj, errors: null } });

        if (!formObj.title || !formObj.description ||
            !formObj.hosted_url || !formObj.github_url ||
            !formObj.image_url) {

            const msg = {
                type: 'warning',
                title: 'Empty Form',
                msg: 'Fill in the form and try again',
            }

            toast.custom(t => (<Bread msgObj={msg} t={t} />));
            return;
        }

        if (Object.values(formErrors).join('') !== '') {

            setFormErrors((currentObj) => { return { ...currentObj, errors: 'Check form errors, highlighted in red' } });
            return;

        }
 
        const modeFunc = (useMode === 'add') ? postPortfolioItem : patchPortfolioItem;
        
        modeFunc(formObj, token, id)
            .then((result) => {

                if (useMode === 'add') {
                    
                    setListHandler(result);
                    const msg = {
                        type: 'success',
                        title: 'Added',
                        msg: 'Item successfully updated',
                    }
                    toast.custom(t => (<Bread msgObj={msg} t={t} />));
                    resetHandler();
                }
                
                if (useMode === 'edit') {
                    const msg = {
                        type: 'success',
                        title: 'Updated',
                        msg: 'Item successfully updated',
                    }
                    toast.custom(t => (<Bread msgObj={msg} t={t} />));
                    setFormParts({ ...formObj });
                }
                
                setApiError(false);

            }).catch((error) => {
                if (error.response.status === 401) {
                    setMessage({
                        msgType: 'error',
                        showMsg: true,
                        title: 'Login Expired or Invalid',
                        msg: 'Your login has expired or is invalid, please try logging in again',
                        dismiss: false,
                    });
                } else {
                    setMessage({
                        msgType: 'error',
                        showMsg: true,
                        title: 'Something Went Wrong',
                        msg: 'If this message persists, please contact the administrator, if you are the administrator, fix the issue please.',
                        dismiss: false,
                    });
                }
                setApiError(true);
            });

    }

    if (apiError)
        return (<></>);
        
    if (loading)
        return <SpinnerSmall />;

    return (
        <>
            <div className={`px-3 pt-0 mb-6 overflow-hidden transition-[max-height] duration-500 ${!expanded ? "ease-in" : "ease-out"} ${expanded ? "max-h-max" : "max-h-0"}`}>
                <form onSubmit={formHandler}>
                    <div className="w-full grid grid-cols-2 gap-4 justify-between">
                        <div className="col-span-2 flex flex-col mb-2">
                            <label htmlFor="title" className="mb-1 ms-1">*Title: <span className="text-xs text-red-500">{formErrors.title}</span></label>
                            <input type="text" value={formObj.title} maxLength={255} name="title" id="title" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.title ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>

                        <div className="col-span-2 flex flex-col mb-2">
                            <label htmlFor="description" className="mb-1 ms-1">*Description: <span className="text-xs text-red-500">{formErrors.description}</span></label>
                            <textarea name="description" value={formObj.description} id="description" onChange={changeHandler} onBlur={changeHandler} cols="30" rows="4" className={`${formErrors.description ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`}>

                            </textarea>
                            <span className={`ms-1 mt-1 text-xs ${formErrors.description ? "text-red-500" : "text-zinc-500"}`}>Character count: {formObj.description.length} (max: 15000)</span>
                        </div>

                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="hosted_url" className="mb-1 ">*Hosted URL: <span className="text-xs text-red-500">{formErrors.hosted_url}</span></label>
                            <input type="text" value={formObj.hosted_url} name="hosted_url" id="hosted_url" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.hosted_url ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="github_url" className="mb-1 ms-1">*GitHub URL:  <span className="text-xs text-red-500">{formErrors.github_url}</span></label>
                            <input type="text" value={formObj.github_url} name="github_url" id="github_url" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.github_url ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="image_url" className="mb-1 ms-1">*Image URL:  <span className="text-xs text-red-500">{formErrors.image_url}</span></label>
                            <input type="text" value={formObj.image_url} name="image_url" id="image_url" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.image_url ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="video_url" className="mb-1 ms-1">Video URL:  <span className="text-xs text-red-500">{formErrors.video_url}</span></label>
                            <input type="text" value={formObj.video_url} name="video_url" id="video_url" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.video_url ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                    </div>
                    <div className="w-full flex flex-row sm:justify-end items-center mb-4 mt-3">
                        <span className="me-4 text-sm font-semibold text-red-500">{formErrors.errors}</span>
                        <button type="button" onClick={resetHandler} className="me-4 text-zinc-700 font-semibold py-1 px-3">
                            Reset
                        </button>
                        {useMode === 'add' ?
                        <button type="submit" className="w-full font-semibold text-white sm:w-fit rounded-full bg-green-500 hover:bg-green-600 shadow-md py-1 px-3">
                            <i className="me-3 fa-solid fa-folder-plus"></i>
                            Add Item
                        </button> 
                            :
                        <button type="submit" className="w-full font-semibold text-white sm:w-fit rounded-full bg-orange-500 hover:bg-orange-600 shadow-md py-1 px-3">
                                <i className="me-2 fa-regular fa-floppy-disk"></i>
                            Save Item
                        </button> 
                         }
                    </div>
                </form>
                <hr className=""/>
            </div>
            
        </>
    )

}

export default PortfolioForm;