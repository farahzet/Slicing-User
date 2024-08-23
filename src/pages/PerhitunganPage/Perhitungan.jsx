import { Button } from '../../components/UIReu/Buton/Button'
import Input from '../../components/UIReu/Form/Input'
import { CreateKalori } from './CreateKalori'
import { CreateSpk } from './CreateSpk'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './Perhitungan.css'
import { dataCalories, validationForm } from '../../Utils/validation'
import { ErrMsg } from '../../components/Error/ErrMsg'
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export const Perhitungan = () => {

    const [page, setPage] = useState(0);
    const [error, setError] = useState({});
    const navigate = useNavigate()
    const [formData, setFormData] = useState ({
        height: "",
        weight: "",
        age:"",
        gender:"",
        activity_name:"",
        calories:"",
        // maxSelecton:"",
        // option:"",
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        validationForm(formData, setError)
    }

    const FormTitles = ["Hitung Kalori" , "Alternatif Makanan"];
    const PageDisplay = () => {
        if (page === 0){
            return <CreateKalori formData={formData} setFormData={setFormData} handleInput={handleInput} error={error}/> ;
        }else{
            return <CreateSpk formData={formData} setFormData={setFormData} /> ;
        }
    }
    const handleClick = () => {
        navigate('/calories/food');
    };

    const handlePostCreateCalories = async () => {
        const formUser = dataCalories(formData); 
    
        console.log("Form Data to be sent:", formUser);

        const height = parseFloat(formData.height);
        let bbi;

        if (formData.gender === "male") {
            if (height >= 160) {
                bbi = 0.9 * (height - 100);
            } else {
                bbi = height - 100;
            }
        } else {
            if (height >= 150) {
                bbi = 0.9 * (height - 100);
            } else {
                bbi = height - 100;
            }
        }

        let weightCategory;
        const lowerBound = bbi * 0.9;
        const upperBound = bbi * 1.1;

        if (formData.weight < lowerBound) {
            weightCategory = "Kurus";
        } else if (formData.weight > upperBound) {
            weightCategory = "Gemuk";
        } else {
            weightCategory = "Normal";
        }

        // Store BBI and weight category in localStorage
        localStorage.setItem('bbi', bbi);
        localStorage.setItem('weightCategory', weightCategory);

    
        const token = Cookies.get('_token');
        console.log("Token for request:", token); // Ambil token cookies
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
            },
        };
    
        try {
            const res = await axios.post('http://localhost:3000/api/v1/calculation', formUser, config);
    
            console.log("Response:", res);
    
            if (res.status === 201) {
                const id = res.data.data.newCalculation.id; // Ambil ID dari respons
                console.log("Navigating with ID:", id); // Tambahkan log sebelum navigasi
                navigate(`/calories/food/${id}`);
                toast.success("Kalori berhasil", { delay: 800 });
            } else {
                toast.error("Terjadi kesalahan saat menambahkan criteria", { delay: 800 });
                console.error("Unexpected response status:", res.status);
            }
        } catch (error) {
            toast.error("Form Belum Diisi", { delay: 800 });
            console.error("Error:", error);
        }
    }; 
    


    return (
        // <section className="container-fluid list-input">
        //     <div className="d-flex flex-column mt-3 ">
        //         <div className="d-flex flex-row align-items-center gap-3 ">
        //             <h3 className="fw-bold fs-2">{FormTitles[page]}</h3>
        //         </div>
        //         <div className="kotak align-items-center">
        //             {PageDisplay()}
        //             <div className= "d-flex flex-row justify-content-center align-items-center gap-3 mb-5">
        //                 <Button
        //                     disabled = {page == 0}
        //                     className="bg-primary border-3 text-white"
        //                     onClick={() => {setPage((currPage) => currPage - 1)}}
        //                 >
        //                     Kembali
        //                 </Button>
        //                 <Button
        //                     className="bg-primary border-3 text-white"
        //                     type="submit"
        //                     onClick={() => {
        //                         if (page == FormTitles.length - 1){
        //                             alert("Form Submitted")
        //                             console.log(FormData)
        //                         }else {
        //                             setPage((currPage) => currPage + 1)
        //                         }
        //                         }}
        //                 >
        //                     {page === FormTitles.length - 1 ? "Submit" : "Lanjut"}
        //                 </Button>
        //             </div>
        //         </div>
        //     </div>
            
        // </section>

        <section className="container-fluid list-input" >
        <div className="my-3 d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-center gap-3  ">
            <div className="kotak d-grid pt-1">
                <div className="d-grid">
                    <form className="d-grid gap-2">
                        {/* <div className="col-12">
                            <label htmlFor="name" className="fw-bold">
                            Nama Lengkap
                            </label>
                            <Input
                            className="form-control input-styles p-3 col-12 col-lg"
                            placeholder="Masukkan Nama"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInput}
                            />
                            <ErrMsg msg={error.name} />
                        </div> */}
                
                        <div className="row g-3">
                            <div className="col">
                                <label htmlFor="weight" className="fw-bold">
                                Berat Badan
                                </label>
                                <Input
                                type="number"
                                className="form-control p-3 col-12 col-lg input-styles "
                                onChange={handleInput}
                                placeholder="Berat Badan"
                                name="weight"
                                value={formData.weight}
                                />
                                <ErrMsg msg={error.weight} />
                            </div>

                            <div className="col">
                                <label htmlFor="height" className="fw-bold">
                                Tinggi Badan
                                </label>
                                <Input
                                type="number"
                                className="form-control p-3 col-12 col-lg input-styles "
                                onChange={handleInput}
                                placeholder="Tinggi Badan"
                                name="height"
                                value={formData.height}
                                />
                                <ErrMsg msg={error.height} />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="age" className="fw-bold">
                            Umur
                            </label>
                            <Input
                                type="number"
                                className="form-control p-3 col-12 col-lg input-styles "
                                onChange={handleInput}
                                placeholder="Umur"
                                name="age"
                                value={formData.age}
                                />
                                <ErrMsg msg={error.age} />
                        </div>
                        
                        <div className="my-3">
                            <label htmlFor="gender" className="fw-bold">
                                Jenis Kelamin
                            </label>
                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === "male"}
                                onChange={handleInput}
                            />
                            <label htmlFor="male">Pria</label>
                            </div>
                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === "female"}
                                onChange={handleInput}
                            />
                            <label htmlFor="female">Wanita</label>
                            </div>
                            <ErrMsg msg={error.gender} />
                        </div>

                        <div className = "my-3">
                            <label htmlFor="activity_name" className="fw-bold">
                                Kegiatan Fisik Harian
                            </label>
                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="activity_name"
                                value="Istirahat"
                                checked={formData.activity_name === "Istirahat"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Istirahat">Istirahat</label>
                            </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="activity_name"
                                value="Pegawai Kantor, Guru, IRT"
                                checked={formData.activity_name === "Pegawai Kantor, Guru, IRT"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Pegawai Kantor, Guru, IRT">Pegawai Kantor, Guru, IRT</label>
                            </div>

                                <div className="d-flex gap-2 ">
                                <Input
                                    type="radio"
                                    name="activity_name"
                                    value="Pegawai industri, Mahasiswa ,Militer"
                                    checked={formData.activity_name === "Pegawai industri, Mahasiswa ,Militer"}
                                    onChange={handleInput}
                                />
                                <label htmlFor="maPegawai industri, Mahasiswa ,Militer">Pegawai industri, Mahasiswa ,Militer</label>
                                </div>

                                <div className="d-flex gap-2 ">
                                <Input
                                    type="radio"
                                    name="activity_name"
                                    value="Petani Buruh"
                                    checked={formData.activity_name === "Petani Buruh"}
                                    onChange={handleInput}
                                />
                                <label htmlFor="female">Petani Buruh</label>
                                </div>
                                <ErrMsg msg={error.activity_name} />
                        </div>

                        {/* <div className = "my-3">
                            <label htmlFor="calories" className="fw-bold">
                                Kondisi Klinis
                            </label>
                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="calories"
                                value="Puasa"
                                checked={formData.calories === "Puasa"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Puasa ">Puasa</label>
                            </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="calories"
                                value="Demam"
                                checked={formData.calories === "Demam"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Demam">Demam</label>
                            </div>

                                <div className="d-flex gap-2 ">
                                <Input
                                    type="radio"
                                    name="calories"
                                    value="Gagal Jantung"
                                    checked={formData.calories === "Gagal Jantung"}
                                    onChange={handleInput}
                                />
                                <label htmlFor="Gagal Jantung">Gagal Jantung</label>
                                </div>

                                <div className="d-flex gap-2 ">
                                <Input
                                    type="radio"
                                    name="calories"
                                    value="Sepsis"
                                    checked={formData.calories === "Sepsis"}
                                    onChange={handleInput}
                                />
                                <label htmlFor="Sepsis">Sepsis</label>
                                </div>

                                <div className="d-flex gap-2 ">
                                <Input
                                    type="radio"
                                    name="calories"
                                    value="Luka Bakar"
                                    checked={formData.calories === "Luka Bakar"}
                                    onChange={handleInput}
                                />
                                <label htmlFor="Luka Bakar">Luka Bakar</label>
                                </div>

                                <div className="d-flex gap-2 ">
                                <Input
                                    type="radio"
                                    name="calories"
                                    value="ICU"
                                    checked={formData.calories === "ICU"}
                                    onChange={handleInput}
                                />
                                <label htmlFor="ICU dengan Ventilator">ICU dengan Ventilator</label>
                                </div>
                                <ErrMsg msg={error.calories} />
                        </div> */}

                        <div className = "my-3">
                            <label htmlFor="calories" className="fw-bold">
                                Kondisi Klinis
                            </label>
                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="calories"
                                value="Stress Ringan"
                                checked={formData.calories === "Stress Ringan"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Stress Ringan ">Stress Ringan (Stress Harian, exp: Stress Kerja/Emosi Ringan)</label>
                            </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="calories"
                                value="Stress Sedang"
                                checked={formData.calories === "Stress Sedang"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Stress Sedang">Stress Sedang (Stress Signifikan, exp : Kehilangan Kerja)</label>
                            </div>

                                <div className="d-flex gap-2 ">
                                <Input
                                    type="radio"
                                    name="calories"
                                    value="Stress Berat"
                                    checked={formData.calories === "Stress Berat"}
                                    onChange={handleInput}
                                />
                                <label htmlFor="Stress Berat">Stress Berat (Operasi,Sepsis,Trauma yang membutuhkan waktu perawatan lama)</label>
                                </div>

                                <div className="d-flex gap-2 ">
                                <Input
                                    type="radio"
                                    name="calories"
                                    value="Stress Sangat Berat"
                                    checked={formData.calories === "Stress Sangat Berat"}
                                    onChange={handleInput}
                                />
                                <label htmlFor="Stress Sangat Berat">Stress Sangat Berat (Operasi Kompleks, Sepsis/Trauma Berat)</label>
                                </div>
                                <ErrMsg msg={error.calories} />
                        </div>
                    </form>
                </div>
                <div className="d-flex justify-content-center align-items-center my-3 ">
                    <Button
                    className="bg-primary border-3 text-white "
                    type="submit"
                    onClick={handlePostCreateCalories}
                    >
                        Hitung
                    </Button>
                </div>
            </div>
        </div>
    </section>
    )
}