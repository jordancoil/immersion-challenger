const Pagination = ({ currentPage, maxPage, changePage }) => {
    const prevPage = () => {
        changePage(prev => prev-1)
    }

    const nextPage = () => {
        changePage(prev => prev+1)
    }

    return (
        <>
            {currentPage > 1 &&
                <button onClick={prevPage}>
                    Prev
                </button>}
            
            <p>Pagination goes here! current page is: {currentPage}</p>

            {currentPage < maxPage &&
                <button onClick={nextPage}>
                    Next
                </button>}
        </>
    )
}

export default Pagination