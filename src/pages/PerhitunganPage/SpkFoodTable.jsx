import { theadAlternatif } from "../../Utils/dataObj";
import { Button } from "../../components/UIReu/Buton/Button";
import { Rowtable } from "../../components/UIReu/Table/Rowtable";


const exampleData = [
    {
        id: 1,
        tanggal: '2024-05-30',
        alternatif : '1',
        makanan: 'Nasi Goreng',
        totalKal: '500',
    },
    {
        id: 2,
        tanggal: '2024-05-29',
        alternatif : '2',
        makanan: 'Mie Ayam',
        totalKal: '600',
    },
    {
        id: 3,
        tanggal: '2024-05-28',
        alternatif : '3',
        makanan: 'Sate Ayam',
        totalKal: '700',
    },
];

export const SpkFoodTable = () => {
    return(
        <div className="card rounded-4 border">
            <div className="card-body bg-light rounded-4 p-4 border-0">
            <div className="d-flex flex-row justify-content-between mb-4">
            <h3 className="card-title fs-2 fw-semibold mb-2">Pemilihan Makanan</h3>
            <Button className="bg-primary text-white fw-semibold d-flex gap-1 rounded-3">
                Tambah Data
            </Button>
            </div>
            <TableSPKPage
                thead={theadAlternatif}>
                <Rowtable
                ifEmpty={"Tidak ada data Alternatif Pemilihan!"}          
                data={exampleData}
                totalRow={5}
                totalCol={8}
                renderItem={(data, index) => {
                    return (
                    <tr
                        // onClick={() => onNavigate(data)}
                        // className="text-nowrap cursor-pointer"
                        // key={index}
                    >
                        <td>{data?.id}</td>
                        <td>{data?.tanggal}</td>
                        <td>{data?.alternatif}</td>
                        <td>{data?.makanan}</td>
                        <td>{data?.totalKal}</td>
                    </tr>
                    );
                }}
                />
            </TableSPKPage>
            </div>
        </div>
    )
}

const TableSPKPage = ({ maxHeight, thead, bgThead, children }) => {
    return(
    <div
    className="table-responsive table-wrapper"
    style={{
        height: "fit-content",
        minHeight: '13rem',
        maxHeight: `calc(100vh - ${maxHeight})`,
    }}
    >
    <table className="table table-borderless table-striped align-middle">
        <thead className="sticky-top z-0 ">
        <tr>
            {thead?.map((item, index) => (
            <th
                key={index}
                className={`fw-semibold text-nowrap ${bgThead} ${item === "Status" && "text-center"
                }`}
                scope="col"
            >
                {item}
            </th>
            ))}
        </tr>
        </thead>
        <tbody>{children}</tbody>
    </table>
    </div>
    )
}