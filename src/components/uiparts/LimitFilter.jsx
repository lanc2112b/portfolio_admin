const LimitFilter = ({limit, setLimit}) => {
    
    const limitHandler = (event) => {

        event.preventDefault();
        setLimit(event.target.value);
    }

    return (
        <>
            <div className="w-100 mb-2 flex flex-row justify-end text-sm">
                <form onSubmit={limitHandler}>
                    <label htmlFor="limit">Per Page:</label>
                    <select name="limit" id="limit" value={limit} onChange={limitHandler} className="text-sm ms-3 py-1 rounded-md border shadow-md">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </form>
            </div>
        </>
    )


}

export default LimitFilter;