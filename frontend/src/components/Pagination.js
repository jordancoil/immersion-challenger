import { useEffect, useState } from "react"

const Pagination = ({ currentPage, totalItems, changePage }) => {
    const [maxPage, setMaxPage] = useState(Math.ceil(totalItems / 12))
    const [minEntry, setMinEntry] = useState((currentPage - 1) * 12 + 1)
    const [maxEntry, setMaxEntry] = useState(Math.min(currentPage * 12, totalItems))

    useEffect(() => {
        setMaxPage(Math.ceil(totalItems / 12))
        setMaxEntry(Math.min(currentPage * 12, totalItems))
    }, [totalItems])

    useEffect(() => {
        setMinEntry((currentPage - 1) * 12 + 1)
        setMaxEntry(Math.min(currentPage * 12, totalItems))
    }, [currentPage])

    const prevPage = () => {
        changePage(prev => prev-1)
    }

    const nextPage = () => {
        changePage(prev => prev+1)
    }

    return (
        
        <nav aria-label="page navigation">
            <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{minEntry}</span> to <span className="font-semibold text-gray-900 dark:text-white">{maxEntry}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button onClick={currentPage > 1 ? prevPage : undefined} className={currentPage > 1
                        ? "flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        : "cursor-not-allowed flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-600 rounded-s dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"}>
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Prev
                    </button>
                    <button onClick={currentPage < maxPage ? nextPage : undefined} className={currentPage < maxPage
                        ? "flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        : "cursor-not-allowed flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-600 rounded-s dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"}>
                        Next
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Pagination