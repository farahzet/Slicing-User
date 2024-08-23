export const PerhitunganTabel = ({
    children,
    thead,
    pageFor,
    className,
    maxHeight
    }) => {

    return (
        <div className={`table-responsive rounded-4 p-4 ${className} mt-4`}>
        <div
            className="table-responsive table-wrapper"
            style={{
            height: 'fit-content',
            minHeight: '13rem',
            maxHeight: `calc(100vh - ${maxHeight ?? '14rem'})`
            }}>
            <table className="table table-borderless table-striped align-middle" >
            <thead className='sticky-top z-0 '>
                <tr>
                {thead?.map((item, index) => (
                    <th
                    key={index}
                    scope="col">
                    {item}
                    </th>
                ))
                }
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
            </table>
        </div>
        </div>
    )
}