const Paginator = ({ rowCount, limit, page, setPage }) => {
    
    const pages = Math.ceil(rowCount / limit);

    let rangeLower = 1;
    let rangeUpper = 7;

    const pageRange = [];

    if (pages < 8) {
        rangeUpper = pages; 
    } else {
        rangeLower = page < 4 ? 1 : page - 3; 
        rangeUpper = (pages > (page + 3)) ? page + 3 : pages;
    }

    for (let i = rangeLower; i < rangeUpper + 1; i++) {
        pageRange.push(i);
    }

    const prev = page === 1 ? 1 : page - 1;

    const next = page === rowCount ? rowCount : page + 1;

    const pageHandler = (pageVal) => {

        setPage(pageVal);

    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => pageHandler(prev)}>
                    Previous
                </button>
                <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => pageHandler(next)}>
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{1 + (page * limit) - limit}</span> to <span className="font-medium">{page * limit}</span> of{' '}
                        <span className="font-medium">{rowCount}</span> results ({pages} pages)
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            disabled={page === 1 }
                            onClick={() => pageHandler(prev)}>
                            <span className="sr-only">Previous</span>
                            <i className="fa-solid fa-chevron-left px-2" aria-hidden="true" ></i>
                        </button>
                        {pageRange.map((element) => {
                            
                            return (element === page) ?
                                (<button key={element}
                                    aria-current="page" 
                                    disabled
                                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        {element}
                                </button>)
                                :
                                (<button key={element}
                                    onClick={() => pageHandler(element)}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                        {element}
                                </button>)    
                        })}
                        <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => pageHandler(next)}
                            disabled={page === pages}>
                            <span className="sr-only">Next</span>
                            <i className="fa-solid fa-chevron-right px-2" aria-hidden="true"></i>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Paginator;