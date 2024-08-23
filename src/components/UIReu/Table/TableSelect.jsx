import React, { useState, useEffect } from 'react';

export const TableSelect = ({
    isError,
    isPending,
    data,
    refetch,
    renderItem,
    ifEmpty,
    paddingError,
    totalCol,
    totalRow
}) => {
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowEmptyMessage(true);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (selectAll && data) {
            setSelectedItems(data.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    }, [selectAll, data]);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const toggleItemSelection = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    if (isPending) {
        return null;
    }

    if (isError) {
        return (
            <tr>
                <td colSpan={totalCol}>
                    <div className={paddingError ? paddingError : 'py-5'}>
                        <p>Gagal memuat data!</p>
                        <Button className={'btn-primary text-white mt-1'} onClick={refetch}>Coba Lagi</Button>
                    </div>
                </td>
            </tr>
        );
    }

    if (showEmptyMessage && data?.length === 0) {
        return (
            <tr>
                <td colSpan={totalCol} className="text-center py-5 rounded-3 fs-2">{ifEmpty}</td>
            </tr>
        );
    }

    return (
        <>
            <tr>
                <td>
                    <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={selectAll}
                    />
                </td>
                <td colSpan={totalCol - 1}></td>
            </tr>
            {data?.map((item, index) => (
                <tr key={index}>
                    <td>
                        <input
                            type="checkbox"
                            onChange={() => toggleItemSelection(item.id)}
                            checked={selectedItems.includes(item.id)}
                        />
                    </td>
                    {renderItem(item, index)}
                </tr>
            ))}
        </>
    );
};
