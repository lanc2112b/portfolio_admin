const LandingListTableRow = ({ element, editClickHandler }) => {
    return (
        <>
            <td className="px-3 py-2">{element.area_title}</td>
            <td className="px-3 py-2">{element.area_content_title}</td>
            <td className="px-3 py-2">{element.github_url}</td>

            <td className="px-3 py-2 text-center">
                <button type="button" value={element.id} className="hover:bg-orange-200 text-orange-700 py-1 px-3 rounded-lg" onClick={() => editClickHandler(element.id)}>
                    <i className="fa-solid fa-pen"></i>
                </button>
            </td>
        </>
    )
}

export default LandingListTableRow;