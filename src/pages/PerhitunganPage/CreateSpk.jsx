import { theadPilihanAlternatif, theadPilihanMakanan, toppings } from "../../Utils/dataObj";
import { Button } from "../../components/UIReu/Buton/Button";
import { Checkbox } from "../../components/UIReu/Form/Checkbox";
import { useState, useEffect } from 'react'
import './Perhitungan.css'
import Input from "../../components/UIReu/Form/Input";
import { useNavigate, useParams,  useLocation } from "react-router-dom";
import { PerhitunganTabel } from "./PerhitunganTable";
import { Rowtable } from "../../components/UIReu/Table/Rowtable";
import { TableSelect } from "../../components/UIReu/Table/TableSelect";
import axios from "axios";



export const CreateSpk = () => {
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [foodTime, setFoodTime] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSelectButtons, setShowSelectButtons] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);
  const [selections, setSelections] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const maxSelections = 3;
  const { id } = useParams(); // Mengambil ID dari URL
  console.log("ID from useParams:", id);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodCaloriesScore, setFoodCaloriesScore] = useState(0);
  const bbi = localStorage.getItem('bbi');
  const weightCategory = localStorage.getItem('weightCategory');



    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/foodCriteria/CPI");
        console.log("API Response:", response.data);
        const sortedData = response.data?.data?.sort((a, b) => a.food_code.localeCompare(b.food_code)) ?? [];

        setData(sortedData);
        setIsPending(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsPending(false);
      }
    };

    // const fetchDataCalculation = async () => {
    //   if (id) {
    //     try {
    //       const resCalculation = await axios.get(`http://localhost:3000/api/v1/calculation/${id}`);
    //       console.log("API Response for Calculation:", resCalculation.data);
  
    //       if (resCalculation.data && resCalculation.data.data && resCalculation.data.data.findData) {
    //         const caloriesScore = resCalculation.data.data.findData.calories_score;
    //         setTotalCalories(caloriesScore);
    //         localStorage.setItem('totalCalories', caloriesScore); // Simpan ke localStorage
    //         console.log("Stored totalCalories in localStorage:", localStorage.getItem('totalCalories'));
    //       } else {
    //         console.error("Calories score not found in response:", resCalculation.data);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //       setIsError(true);
    //       setIsPending(false);
    //     }
    //   } else {
    //     console.error("ID is undefined or null");
    //   }
    // };

    const fetchDataCalculation = async () => {
      if (id) {
          try {
              const resCalculation = await axios.get(`http://localhost:3000/api/v1/calculation/${id}`);
              console.log("API Response for Calculation:", resCalculation.data);
  
              if (resCalculation.data && resCalculation.data.data && resCalculation.data.data.totalCalories !== undefined) {
                  const caloriesScore = resCalculation.data.data.totalCalories; // Access `totalCalories` correctly
                  setTotalCalories(caloriesScore);
                  localStorage.setItem('totalCalories', caloriesScore); // Store in localStorage
                  console.log("Stored totalCalories in localStorage:", localStorage.getItem('totalCalories'));
              } else {
                  console.error("Calories score not found in response:", resCalculation.data);
              }
          } catch (error) {
              console.error("Error fetching data:", error);
              setIsError(true);
              setIsPending(false);
          }
      } else {
          console.error("ID is undefined or null");
      }
  };
  
  
    

    useEffect(() => {
      console.log("Fetching data...");
      fetchData();
    }, []);

    useEffect(() => {
      if (id) {
          console.log("Fetching data for ID:", id);
          fetchDataCalculation();
      } else {
          console.error("ID is undefined or null");
      }
  }, [id]);

    useEffect(() => {
      console.log("Total Calories:", totalCalories);
    }, [totalCalories]);

    const calculatePortionSize = () => {
      let portion = 0;
      if (foodTime === "Pagi") {
        portion = totalCalories * 0.20; // 20% of total calories
      } else if (foodTime === "Siang") {
        portion = totalCalories * 0.35; // 35% of total calories
      } else if (foodTime === "Malam") {
        portion = totalCalories * 0.30; // 30% of total calories
      }
      const portionSize = parseFloat(portion).toFixed(2);

      return portionSize;
    };
  
    const handleSelectAll = () => {
      setSelectAll(!selectAll);
      if (!selectAll) {
        setSelectedItems(data.map((_, index) => index));
      } else {
        setSelectedItems([]);
      }
    };
  
    const handleSubmit = () => {
      if (selectionCount >= maxSelections) {
        alert("Anda sudah mencapai batas maksimum pemilihan.");
        return;
      }
    
      const selectedCheckboxes = Array.from(document.querySelectorAll('input[name="options"]:checked'));
      if (selectedCheckboxes.length === 0) {
        alert("Silakan pilih setidaknya satu checkbox.");
        return;
      }
    
      const selectedValues = selectedCheckboxes.map(cb => cb.value);
      console.log("Selected Values:", selectedValues);
    
      const selectedItemsData = selectedValues.map(value => {
        const item = data.find(dataItem => dataItem.food_code === value);
        return item ? item.food_name : '';
      });
    
      console.log("Selected Items Data:", selectedItemsData);
    
      const totalCaloriesSelected = selectedValues.reduce((total, value) => {
        const item = data.find(dataItem => dataItem.food_code === value);
        const calories = item ? parseFloat(item.total_score) : 0;  // Convert to float
        return total + (isNaN(calories) ? 0 : calories);  // Handle NaN case
      }, 0);
    
      const averageCalories = (totalCaloriesSelected / selectedValues.length).toFixed(2);
      console.log("Average Calories Per Item:", averageCalories);
    
      const portionSize = parseFloat(calculatePortionSize());
    
      // Check if average calories exceed the portion size
      if (averageCalories > portionSize) {
        alert(`Rata-rata kalori per item (${averageCalories}) melebihi porsi yang dihitung (${portionSize}). Silakan pilih makanan dengan rata-rata kalori yang lebih rendah.`);
        return;
      }
    
      // Save the average calories to total_score instead of totalCaloriesSelected
      const newSelections = [...selections, { id: selectionCount + 1, food_name: selectedItemsData, total_score: averageCalories }];
      console.log("New Selections:", newSelections);
    
      setSelections(newSelections);
      setSelectionCount(selectionCount + 1);
    
      // Reset checkboxes
      selectedCheckboxes.forEach(cb => cb.checked = false);
      setSelectedItems([]);
      setSelectAll(false);
    };
    
    
    
    
    
    
  
    const handleCheckboxChange = (index) => {
      const selectedIndex = selectedItems.indexOf(index);
      let newSelectedItems = [...selectedItems];
  
      if (selectedIndex === -1) {
        newSelectedItems.push(index);
      } else {
        newSelectedItems.splice(selectedIndex, 1);
      }
  
      setSelectedItems(newSelectedItems);
    };
  
    const toggleSelectButtons = () => {
      setShowSelectButtons(!showSelectButtons);
    };
  
    const handleCancel = () => {
      setSelectedItems([]);
      setShowSelectButtons(false);
    };

    const handleInput = (e) => {
      const { value } = e.target;
      setFoodTime(value);
    };
  
    const handleClick = () => {
      const portionSize = calculatePortionSize();

      localStorage.setItem('selectionsData', JSON.stringify(selections));
      localStorage.setItem('totalCalories', totalCalories);
      localStorage.setItem('foodTime', foodTime);
      localStorage.setItem('portionSize', portionSize);
      navigate(`/calories/result/${id}`);
    };
    console.log("Data:", data);
    console.log("Selections:", selections);

    return (
      <div className="List">
        <div className="title" style={{ marginLeft: '35px', marginTop: '30px' }}>
          <div className="bg-body-tertiary p-5 rounded mt-3 mb-4" style={{ marginRight: '35px'}}>
            <h5>Total Kalori Harian Anda : {totalCalories} </h5>
            {bbi && weightCategory && (
                    <h5>Berat Badan Ideal Anda: {bbi} yang artinya termasuk {weightCategory}</h5>
                )}
                <h6>Porsi makan {foodTime} adalah {calculatePortionSize()} kalori </h6>
          </div>


          <h6 className="fw-bold">Daftar Alternatif Makanan</h6>

          <div className="my-3">
            <label htmlFor="foodTime" className="fw-bold">
                Pilih Jadwal Makan
            </label>
            <div className="d-flex gap-2 ">
            <Input
                type="radio"
                id="Pagi"
                name="foodTime"
                value="Pagi"
                checked={foodTime === "Pagi"}
                onChange={handleInput}
            />
            <label htmlFor="Pagi">Pagi</label>
            </div>
            <div className="d-flex gap-2 ">
            <Input
                type="radio"
                id="Siang"
                name="foodTime"
                value="Siang"
                checked={foodTime === "Siang"}
                onChange={handleInput}
            />
            <label htmlFor="Siang">Siang</label>
            </div>
            <div className="d-flex gap-2 ">
            <Input
                type="radio"
                id="Malam"
                name="foodTime"
                value="Malam"
                checked={foodTime === "Malam"}
                onChange={handleInput}
            />
            <label htmlFor="Malam">Malam</label>
            </div>
        </div>
        </div>

        
  
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {showSelectButtons ? (
                <>
                    <Button
                        className="btn btn-success"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        className="btn btn-secondary"
                        onClick={handleCancel}
                    >
                        Batal
                    </Button>
                </>
            ) : (
                <Button
                    className="btn btn-dark"
                    onClick={toggleSelectButtons}
                >
                    Pilih
                </Button>
            )}
        </div>

        <div className="table-responsive p-4">
          <table className="table" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                {showSelectButtons && (
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="selectAllCheckbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                <th scope="col">Code</th>
                <th scope="col">Nama Makanan</th>
                <th scope="col">Kalori Makanan</th>
                <th scope="col">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => {
                console.log("Rendering Item:", item); // Log item yang sedang dirender
                return (
                  <tr key={index}>
                    {showSelectButtons && (
                      <td>
                        <input
                          type="checkbox"
                          name="options"
                          value={item.food_code}
                          checked={selectedItems.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                    )}
                    <td>{item.food_code}</td>
                    <td>{item.food_name}</td>
                    <td>{item.total_score}</td>
                    <td>{item.food_desc}</td>
                  </tr>
                );
              })
            ) : (
          <tr>
            <td colSpan="4">No data available</td>
          </tr>
        )}
      </tbody>
          </table>
        </div>

        <PerhitunganTabel
        thead={theadPilihanMakanan}>
          <Rowtable
              ifEmpty={"Tidak ada data Riwayat Pemilihan!"}          
              data={selections}
              totalRow={3}
              totalCol={8}
              renderItem={(data, index) => {
                console.log("masuk data??", data)
                  return (
                  <tr
                      // onClick={() => onNavigate(data)}
                      // className="text-nowrap cursor-pointer"
                      // key={index}
                  >
                      <td>{data?.id}</td>
                      <td>{Array.isArray(data?.food_name) ? data.food_name.join(', ') : ''}</td>
                      <td>{data?.total_score}</td>
                  </tr>
                  );
              }}
              />
        </PerhitunganTabel>

        <div className="d-flex justify-content-center align-items-center my-3 ">
            <Button
            className="bg-primary border-3 text-white "
            type="submit"
            onClick={handleClick}
            >
                Submit
            </Button>
        </div>
      </div>
  );
};