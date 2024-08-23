import { theadPilihanAlternatif } from "../../Utils/dataObj";
import { Rowtable } from "../../components/UIReu/Table/Rowtable";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

export const ResultSpk = () => {
  return (
    <section className="container-fluid ">
      <div className="m-3">
        <ResultSpkTable />
      </div>
    </section>
  );
};



export const ResultSpkTable = () => {
  const [data, setData] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [sisaCalories, setSisaCalories] = useState(0);
  const bbi = localStorage.getItem('bbi');
  const weightCategory = localStorage.getItem('weightCategory');
  const portionSize = localStorage.getItem('portionSize')
  const [mealTime, setMealTime] = useState("");

  let menuDiet;
  if (weightCategory === "Normal" ){
    menuDiet = "dengan menggunakan jenis menu diet 1700 - 1900 kkal"
  } else if (weightCategory === "Gemuk" ){
    menuDiet = "dengan menggunakan jenis menu diet 1100 - 1500"
  } else {
    menuDiet = "dengan menggunakan jenis menu diet 2100 - 2500"
  }

  useEffect(() => {
    const storedCalories = localStorage.getItem('totalCalories');
  
    if (storedCalories) {
      setTotalCalories(storedCalories);
    }

    const storedMealTime = localStorage.getItem('foodTime');
    setMealTime(storedMealTime || "Not selected");
  },[])

  
  


  useEffect(() => {
    const storedData = localStorage.getItem('selectionsData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Sort data by total_calories in descending order
      const sortedData = parsedData.sort((a, b) => b.total_score - a.total_score);

      // Assign ranks
      const rankedData = sortedData.map((item, index) => ({
        ...item,
        id: index + 1,
        Peringkat: index + 1
      }));

      setData(rankedData);

      if (rankedData.length > 0) {
        const sisa = totalCalories - rankedData[0].total_score;
        setSisaCalories(sisa);
      }
    }
  }, [totalCalories]);

    return(
      <div className="card rounded-4 border">
        <div className="card-body bg-light rounded-4 p-4 border-0">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="card-title fs-2 fw-semibold mb-2">Pemilihan Makanan {mealTime}</h3>
          </div>
          <TableResultPage
            thead={theadPilihanAlternatif}>
            <Rowtable
              ifEmpty={"Tidak ada data Pemilihan!"}          
              data={data}
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
                    <td>{Array.isArray(data?.food_name) ? data.food_name.join(', ') : ''}</td>
                    <td>{data?.total_score}</td>
                    <td>{data?.Peringkat}</td>
                  </tr>
                );
              }}
            />
            
          </TableResultPage>
            <h4>Hasilnya : </h4>
              <h5>Porsi Makan {mealTime} : {portionSize}</h5>
              <h5>Total Kalori Harian Anda : {totalCalories} </h5>
              <h5>Sisa Kalori Harian Anda : {sisaCalories} </h5>
              {bbi && weightCategory && (
                    <h5>Berat Badan Ideal Anda: {bbi} yang artinya termasuk ke dalam kategori {weightCategory}</h5>
                )}
                <p>Untuk pengaturan makanan selain dari hasil yang di tabel disarankan untuk mengikuti standar diet {menuDiet} </p>
        </div>
      </div>
  );
};
  
  
const TableResultPage = ({ maxHeight, thead, bgThead, children }) => {
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
