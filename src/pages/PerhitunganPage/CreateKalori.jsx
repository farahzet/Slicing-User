import { ErrMsg } from "../../components/Error/ErrMsg"
import Input from "../../components/UIReu/Form/Input"

export const CreateKalori = ({formData, setFormData, handleInput, error}) => {
    return(
        <section className="container-fluid" >
        <div className="my-3 d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-center gap-3  ">
            <div className="d-grid pt-1">
                <form className="d-grid gap-2">
                    <div className="col-12">
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
                    </div>
            
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
                        <label htmlFor="job" className="fw-bold">
                            Kegiatan Fisik Harian
                        </label>
                        <div className="d-flex gap-2 ">
                        <Input
                            type="radio"
                            name="job"
                            value="Istirahat "
                            checked={formData.job === "Istirahat "}
                            onChange={handleInput}
                        />
                        <label htmlFor="Istirahat ">Istirahat</label>
                        </div>

                        <div className="d-flex gap-2 ">
                        <Input
                            type="radio"
                            name="job"
                            value="Pegawai Kantor, Guru, IRT"
                            checked={formData.job === "Pegawai Kantor, Guru, IRT"}
                            onChange={handleInput}
                        />
                        <label htmlFor="Pegawai Kantor, Guru, IRT">Pegawai Kantor, Guru, IRT</label>
                        </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="job"
                                value="Pegawai industri, Mahasiswa ,Militer"
                                checked={formData.job === "Pegawai industri, Mahasiswa ,Militer"}
                                onChange={handleInput}
                            />
                            <label htmlFor="maPegawai industri, Mahasiswa ,Militer">Pegawai industri, Mahasiswa ,Militer</label>
                            </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="job"
                                value="Petani Buruh"
                                checked={formData.job === "Petani Buruh"}
                                onChange={handleInput}
                            />
                            <label htmlFor="female">Petani Buruh</label>
                            </div>
                            <ErrMsg msg={error.job} />
                    </div>

                    <div className = "my-3">
                        <label htmlFor="job" className="fw-bold">
                            Kondisi Klinis
                        </label>
                        <div className="d-flex gap-2 ">
                        <Input
                            type="radio"
                            name="condition"
                            value="Puasa "
                            checked={formData.condition === "Puasa "}
                            onChange={handleInput}
                        />
                        <label htmlFor="Puasa ">Puasa</label>
                        </div>

                        <div className="d-flex gap-2 ">
                        <Input
                            type="radio"
                            name="condition"
                            value="Demam"
                            checked={formData.condition === "Demam"}
                            onChange={handleInput}
                        />
                        <label htmlFor="Demam">Demam</label>
                        </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="condition"
                                value="Gagal Jantung"
                                checked={formData.condition === "Gagal Jantung"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Gagal Jantung">Gagal Jantung</label>
                            </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="condition"
                                value="Sepsis"
                                checked={formData.condition === "Sepsis"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Sepsis">Sepsis</label>
                            </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="condition"
                                value="Luka Bakar"
                                checked={formData.condition === "Luka Bakar"}
                                onChange={handleInput}
                            />
                            <label htmlFor="Luka Bakar">Luka Bakar</label>
                            </div>

                            <div className="d-flex gap-2 ">
                            <Input
                                type="radio"
                                name="condition"
                                value="ICU"
                                checked={formData.condition === "ICU"}
                                onChange={handleInput}
                            />
                            <label htmlFor="ICU dengan Ventilator">ICU dengan Ventilator</label>
                            </div>
                            <ErrMsg msg={error.condition} />
                    </div>
                </form>
            </div>
        </div>
    </section>
    )
}