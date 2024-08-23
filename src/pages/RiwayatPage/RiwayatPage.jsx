import { theadRiwayat } from "../../Utils/dataObj";
import { Button } from "../../components/UIReu/Buton/Button";
import React from 'react';
import { Rowtable } from "../../components/UIReu/Table/Rowtable";
import './Riwayat.css'
import axios from "axios";
import { useState,useEffect } from 'react'
import Cookies from "js-cookie";

export const RiwayatPage = () => {
  return (
    <section className="container-fluid ">
      <div className="m-3">
        <RiwayatTable />
      </div>
    </section>
  );
};




export const RiwayatTable = ({ forPage }) => {

  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  

  const fetchData = async () => {
    const token = Cookies.get('_token');
    console.log("Token for request:", token); // Ambil token cookies
    const config = {
        headers: {
        Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
        },
    };
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/calculation/calories`,config)
      console.log("API Response:", response.data);
      setData(response.data.data); 
      setIsPending(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsError(true);
      setIsPending(false);
    }
};

useEffect(() => {
    fetchData();
}, []);

  return (
    <div className="card rounded-4 border">
    <div className="card-body bg-light rounded-4 p-4 border-0">
      <div className="d-flex flex-row justify-content-between">
      <h5 className="card-title fs-2 fw-semibold mb-2">Riwayat Perhitungan Kalori Tubuh</h5>
      {forPage === 'homepage'
      && (<Button className="fw-semibold text-decoration-none">Lihat Semua</Button>
      )}
      </div>
      <TableRiwayatPage
        thead={theadRiwayat}>
        <Rowtable
          ifEmpty={"Tidak ada data Riwayat Pemilihan!"}          
          data={data}
          totalRow={4}
          totalCol={8}
          renderItem={(data, index) => {
            return (
              <tr
                // onClick={() => onNavigate(data)}
                // className="text-nowrap cursor-pointer"
                key={index}
              >
                <td>{index+1}</td>
                <td>{data?.createdAt}</td>
                <td>{data?.weight}</td>
                <td>{data?.height}</td>
                <td>{data?.calories_score}</td>
              </tr>
            );
          }}
        />
      </TableRiwayatPage>
    </div>
    </div>

  );
};



const TableRiwayatPage = ({ maxHeight, thead, bgThead, children }) => {
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