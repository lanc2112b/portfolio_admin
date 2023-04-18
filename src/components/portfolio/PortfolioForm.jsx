import { useState } from "react";

const PortfolioForm = () => {

    const [expanded, setExpanded] = useState(false);

    const [formObj, setFormObj] = useState({
        title: '',
        description: '',
        hosted_url: '',
        github_url: '',
        image_url: '',
        video_url: '',
    });

    const [formErrors, setFormErrors] = useState({
        title: null,
        description: null,
        hosted_url: null,
        github_url: null,
        image_url: null,
        video_url: null,
        formErrors: null,
    });

//errors: null,

    const changeHandler = (event) => {
        
        const currentTrack = event.target.name;
        const currentVal = event.target.value;
        const newObj = { ...formObj };

        newObj[currentTrack] = currentVal;
        setFormObj(newObj);

        validateFormItem(currentTrack);
    }
    
    function validateFormItem(name) {
        
        const tmpObj = { ...formErrors };
        
        tmpObj.errors = null;
        
        if (name === 'title') {

            tmpObj.title = null;

            

            if (!formObj.title) {
                tmpObj.title = 'Title is required';
                
            } else {

                if (formObj.title.length > 0 && formObj.title.length < 10) {
                    tmpObj.title = 'Title must have more than 10 characters';
                }

                if (formObj.title.length > 255) {
                    tmpObj.title = 'Title must have less than 255 characters';
                }
            }
        }

        if (name === 'description') {

            tmpObj.description = null;

            if (!formObj.description) {
                tmpObj.description = 'Description is required';

            } else {

                if (formObj.description.length > 0 && formObj.description.length < 10) {
                    tmpObj.description = 'Description must have more than 10 characters';
                }

                if (formObj.description.length > 1500) {
                    tmpObj.description = 'Description must have less than 255 characters';
                }
            }
        }

        if (name === 'hosted_url') {

            tmpObj.hosted_url = null;

            if (!formObj.hosted_url) {
                tmpObj.hosted_url = 'A URL is required';

            } else {

                if (formObj.hosted_url.length > 0 && formObj.hosted_url.length < 10) {
                    tmpObj.hosted_url = 'URL must have more than 10 characters';
                }

                if (formObj.hosted_url.length > 255) {
                    tmpObj.hosted_url = 'URL must have less than 255 characters';
                }

                if (!/^(http(s?):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(formObj.hosted_url)) {
                    tmpObj.hosted_url = 'URL must be valid';
                }
            }
        }

        if (name === 'github_url') {

            tmpObj.github_url = null;

            if (formObj.github_url) {

                if (formObj.github_url.length > 0 && formObj.github_url.length < 10) {
                    tmpObj.github_url = 'URL must have more than 10 characters';
                }

                if (formObj.github_url.length > 255) {
                    tmpObj.github_url = 'URL must have less than 255 characters';
                }

                if (!/^(http(s?):\/\/)([-a-z0-9]{1,6}\.)?github\.com\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(formObj.github_url)) {
                    tmpObj.github_url = 'URL must be a valid GitHub URL';
                }
            }
        }
        
        if (name === 'image_url') {

            tmpObj.image_url = null;

            if (!formObj.image_url) {
                tmpObj.image_url = 'A URL is required';

            } else {

                if (formObj.image_url.length > 0 && formObj.image_url.length < 10) {
                    tmpObj.image_url = 'URL must have more than 10 characters';
                }

                if (formObj.image_url.length > 255) {
                    tmpObj.image_url = 'URL must have less than 255 characters';
                }

                if (!/^(http(s?):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)\.(jpg|jpeg|png|webp)$/g.test(formObj.image_url)) {
                    tmpObj.image_url = 'URL must be a valid image resource';
                }
            }
        }

        if (name === 'video_url') {

            tmpObj.video_url = null;

            if (formObj.video_url) {

                if (formObj.video_url.length > 0 && formObj.video_url.length < 10) {
                    tmpObj.video_url = 'URL must have more than 10 characters';
                }

                if (formObj.video_url.length > 255) {
                    tmpObj.video_url = 'URL must have less than 255 characters';
                }

                if (!/^(http(s?):\/\/)([-a-z0-9]{1,6}\.)?(youtube\.com|youtu.be)\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(formObj.video_url)) {
                    tmpObj.video_url = 'URL must be a valid YouTube URL';
                }
            }
        }

        setFormErrors(tmpObj);
    }

    const formHandler = (event) => {

        event.preventDefault();

        const tmpObj = { ...formErrors };

        tmpObj.errors = null;

        if (Object.values(formErrors).join('')) {

            tmpObj.errors = "Check form errors, highlighted in red."
            setFormErrors(tmpObj);
            return;

        }

        setFormErrors(tmpObj);

        


        //console.log(formErrors);
        //send  formObj :)

        //console.log(Object.values(formErrors).join(''));

    }

    const toggleExpanded = () => {

        setExpanded(!expanded);

    }

    

    //console.log(formErrors);

    return (
        <>
            <div className="w-full flex justify-end py-2 px-3">
                <button type="button" className="bg-green-500 text-white font-semibold rounded-full focus:bg-green-600 hover:bg-green-600 px-3 py-1 shadow-md" onClick={toggleExpanded}>
                    {!expanded ? <i className="me-3 fa-regular fa-square-plus"></i> : <i className="me-3 fa-regular fa-square-minus"></i>}
                    Add
                </button>
            </div>
            <div className={`px-3 pt-0 mb-6 overflow-hidden transition-[max-height] duration-500 ${!expanded ? "ease-in" : "ease-out"} ${expanded ? "max-h-max" : "max-h-0"}`}>
                <form onSubmit={formHandler}>
                    <div className="w-full grid grid-cols-2 gap-4 justify-between">
                        <div className="col-span-2 flex flex-col mb-2">
                            <label htmlFor="title" className="mb-1 ms-1">Title: <span className="text-xs text-red-500">{formErrors.title}</span></label>
                            <input type="text" maxLength={255} name="title" id="title" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.title ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>

                        <div className="col-span-2 flex flex-col mb-2">
                            <label htmlFor="description" className="mb-1 ms-1">Description: <span className="text-xs text-red-500">{formErrors.description}</span></label>
                            <textarea name="description" id="description" onChange={changeHandler} onBlur={changeHandler} cols="30" rows="4" className={`${formErrors.description ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`}></textarea>
                            <span className={`ms-1 mt-1 text-xs ${formErrors.description ? "text-red-500" : "text-zinc-500"}`}>Character count: {formObj.description.length} (max: 1500)</span>
                        </div>

                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="hosted_url" className="mb-1 ">Hosted URL: <span className="text-xs text-red-500">{formErrors.hosted_url}</span></label>
                            <input type="text" name="hosted_url" id="hosted_url" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.hosted_url ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="github_url" className="mb-1 ms-1">GitHub URL:  <span className="text-xs text-red-500">{formErrors.github_url}</span></label>
                            <input type="text" name="github_url" id="github_url" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.github_url ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="image_url" className="mb-1 ms-1">Image URL:  <span className="text-xs text-red-500">{formErrors.image_url}</span></label>
                            <input type="text" name="image_url" id="image_url" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.image_url ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="video_url" className="mb-1 ms-1">Video URL:  <span className="text-xs text-red-500">{formErrors.video_url}</span></label>
                            <input type="text" name="video_url" id="video_url" onChange={changeHandler} onBlur={changeHandler} className={`${formErrors.video_url ? "border-red-300" : "border-slate-300"} rounded-md border shadow-md`} />
                        </div>
                    </div>
                    <div className="w-full flex flex-row sm:justify-end items-center mb-4 mt-3">
                        <span className="me-4 text-sm font-semibold text-red-500">{formErrors.errors}</span>
                        <button type="submit" className="w-full font-semibold text-white sm:w-fit rounded-full bg-green-500 hover:bg-green-600 shadow-md py-1 px-3">
                            <i className="me-3 fa-solid fa-folder-plus"></i>
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default PortfolioForm;