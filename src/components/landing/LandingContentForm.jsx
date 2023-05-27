import { useState, useContext } from "react";
import toast from "react-hot-toast";
import Bread from "../uiparts/Bread";
import { UserContext } from "../../contexts/User";
import { MessageContext } from "../../contexts/Message";
import { postLandingItem, patchLandingItem } from "../../api/ApiConsumer";
import SpinnerSmall from "../uiparts/SpinnerSmall";

const LandingContentForm = ({ expanded, formMode, id, setListHandler, formParts, setFormParts, loading }) => {

    const { user } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    const [apiError, setApiError] = useState(false);

    const [formErrors, setFormErrors] = useState({
        area_title: null,
        area_content_title: null,
        area_content: null,
        area_content_image: null,
        errors: null,
    });

    const initial = formParts ? { ...formParts } : {
        area_title: '',
        area_content_title: '',
        area_content: '',
        area_content_image: '',
    }

    const [formObj, setFormObj] = useState(initial);

    const formHandler = (event) => {

        event.preventDefault();

        const token = user.token;

        setFormErrors((currentObj) => { return { ...currentObj, errors: null } });

        if (!formObj.area_title || !formObj.area_content_title || !formObj.area_content) {

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

        const modeFunc = (formMode === 'add') ? postLandingItem : patchLandingItem;

        modeFunc(formObj, token, id)
            .then((result) => {

                if (formMode === 'add') {

                    setListHandler(result);
                    const msg = {
                        type: 'success',
                        title: 'Added',
                        msg: 'Content successfully added',
                    };
                    toast.custom(t => (<Bread msgObj={msg} t={t} />));
                    resetHandler();
                }

                if (formMode === 'edit') {

                    setFormParts({ ...formObj });
                    const msg = {
                        type: 'success',
                        title: 'Updated',
                        msg: 'Content successfully updated',
                    };
                    toast.custom(t => (<Bread msgObj={msg} t={t} />));
                }

                setApiError(false);

            })
            .catch((error) => {

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

    const changeHandler = (event) => {

        const { name, value } = event.target;

        validateFormItem(name, value);

        setFormObj((currentObj) => { return { ...currentObj, [name]: value } });

    }

    function validateFormItem(name, value) {

        if (name === 'area_title') {

            setFormErrors((currErrs) => { return { ...currErrs, area_title: '' } });

            if (!value) {
                setFormErrors((currErrs) => { return { ...currErrs, area_title: 'Title is required' } });

            } else {

                if (value.length > 0 && value.length < 4) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_title: 'Title must have more than 4 characters' } });
                }

                if (value.length > 24) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_title: 'Title exceeds max 24 characters' } });
                }
            }
        }

        if (name === 'area_content_title') {

            setFormErrors((currErrs) => { return { ...currErrs, area_content_title: '' } });

            if (!value) {
                setFormErrors((currErrs) => { return { ...currErrs, area_content_title: 'Content title is required' } });

            } else {

                if (value.length > 0 && value.length < 12) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_content_title: 'Content title must have more than 12 characters' } });
                }

                if (value.length > 255) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_content_title: 'Content title exceeds max 255 characters' } });
                }
            }
        }

        if (name === 'area_content') {

            setFormErrors((currErrs) => { return { ...currErrs, area_content: '' } });

            if (!value) {
                setFormErrors((currErrs) => { return { ...currErrs, area_content: 'Content is required' } });

            } else {

                if (value.length > 0 && value.length < 20) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_content: 'Content must have more than 20 characters' } });
                }

                if (value.length > 3000) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_content: 'Content exceeds max 3000 characters' } });
                }
            }
        }

        if (name === 'area_content_image') {

            setFormErrors((currErrs) => { return { ...currErrs, area_content_image: '' } });

            if (value) {

                if (value.length > 0 && value.length < 10) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_content_image: 'URL must have more than 10 characters' } });
                }

                if (value.length > 255) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_content_image: 'URL must have less than 255 characters' } });
                }

                if (!/^(http(s?):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(jpg|jpeg|png|webp|svg)$/g.test(value)) {
                    setFormErrors((currErrs) => { return { ...currErrs, area_content_image: 'URL must be a valid image resource' } });
                }
            }
        }

    }

    const resetHandler = () => {
        setFormObj(initial);
        setFormErrors({
            area_title: null,
            area_content_title: null,
            area_content: null,
            area_content_image: null,
        });
    }

    if (loading)
        return <SpinnerSmall />;

    if (apiError)
        return (<></>);

    return (
        <>
            <div className={`px-3 pt-0 mb-6 overflow-hidden transition-[max-height] duration-500 ${!expanded ? "ease-in" : "ease-out"} ${expanded ? "max-h-max" : "max-h-0"}`}>
                <form onSubmit={formHandler}>
                    <div className="w-full grid grid-cols-12 gap-4 justify-between">
                        <div className="col-span-12 sm:col-span-4 flex flex-col mb-2">
                            <label htmlFor="area_title" className="mb-1 ms-1">*Area: <span className="text-xs text-red-500">{formErrors.area_title}</span></label>
                            <input type="text" value={formObj.area_title} maxLength={24} name="area_title" id="area_title" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.area_title ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                        <div className="col-span-12 sm:col-span-8 flex flex-col mb-2">
                            <label htmlFor="area_content_title" className="mb-1 ms-1">*Content Title: <span className="text-xs text-red-500">{formErrors.area_content_title}</span></label>
                            <input type="text" value={formObj.area_content_title} maxLength={255} name="area_content_title" id="area_content_title" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.area_content_title ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                        <div className="col-span-12 flex flex-col mb-2">
                            <label htmlFor="area_content" className="mb-1 ms-1">*Content: <span className="text-xs text-red-500">{formErrors.area_content}</span></label>
                            <textarea name="area_content" value={formObj.area_content} id="area_content" onChange={changeHandler} onBlur={changeHandler} cols="30" rows="4" className={`${formErrors.area_content ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`}>

                            </textarea>
                            <span className={`ms-1 mt-1 text-xs ${formErrors.area_content ? "text-red-500" : "text-zinc-500"}`}>Character count: {formObj.area_content?.length} (max: 3000)</span>
                        </div>
                        <div className="col-span-12 flex flex-col mb-2">
                            <label htmlFor="area_content_image" className="mb-1 ms-1">Content Image (URL): <span className="text-xs text-red-500">{formErrors.area_content_image}</span></label>
                            <input type="url" value={formObj.area_content_image} maxLength={255} name="area_content_image" id="area_content_image" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.area_content_image ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                    </div>
                    <div className="w-full flex flex-row sm:justify-end items-center mb-4 mt-3">
                        <span className="me-4 text-sm font-semibold text-red-500">{formErrors.errors}</span>
                        <button type="button" onClick={resetHandler} className="me-4 text-zinc-700 font-semibold py-1 px-3">
                            Reset
                        </button>
                        {formMode === 'add' ?
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
                <hr className="" />
            </div>
        </>
    );
}

export default LandingContentForm;