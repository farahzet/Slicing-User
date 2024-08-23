import { Button } from "../../components/UIReu/Buton/Button"
import Input from '../../components/UIReu/Form/Input'


export const Kelola = () => {
    return (

        <section className="container-fluid">
            <div className="mt-5 d-flex flex-column ms-4">
                <div className = "d-flex gap-3">
                    <div className = "p-2 g-col-6">
                        <h5 className="fw-semibold fs-5 mb-0 ">Informasi User</h5>
                        <p>Silahkan update nama, email dan no telepon akun anda!</p>
                    </div>
                    <div className="card shadow-sm p-3 mb-3 rounded-2 ms-4" style={{ width: "35rem" }}>
                        <div className="card-body">
                            <form className="d-grid gap-2">
                                <div className="col-12">
                                    <label htmlFor="nama" className="fw-semibold ">
                                    Nama
                                    </label>
                                    <Input
                                    className="form-control input-styles p-3 col-12 col-lg"
                                    placeholder="Masukkan Nama"
                                    type="text"
                                    name="nama"
                                    // value={form.fullname}
                                    // onChange={(e) => handleInput(e)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="telephone" className="fw-semibold">
                                    No Telephone
                                    </label>
                                    <Input
                                    className="form-control input-styles p-3 col-12 col-lg"
                                    placeholder="Masukkan No Telephone"
                                    type="text"
                                    name="telephone"
                                    // value={form.fullname}
                                    // onChange={(e) => handleInput(e)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="fw-semibold">
                                    Email
                                    </label>
                                    <Input
                                    className="form-control input-styles p-3 col-12 col-lg"
                                    placeholder="Masukkan Email"
                                    type="text"
                                    name="email"
                                    // value={form.fullname}
                                    // onChange={(e) => handleInput(e)}
                                    />
                                </div>

                                <div className= "d-flex justify-content-center align-items-center gap-5 my-3">
                                    <Button
                                        className="bg-primary border-3 text-white"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* <div className = "d-flex grid gap-3">
                    <div className = "p-2 g-col-6">
                        <h5 className="fw-semibold fs-5 mb-0 ">Informasi User</h5>
                        <p>Silahkan update akun anda!</p>
                    </div>
                    <div className="card mb-3" >
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password 
                                </label>
                                <div className="input-group ">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control border-end-0"
                                        name="password"
                                        value={form.password}
                                        placeholder="Masukkan password"
                                        onChange={(e) => handleFormInput(e)}
                                        
                                    />
                                    <span className='input-group-text bg-white' onClick={handleTogglePasswordVisibility}>
                                        <img src={showPassword ? 'src/hide-pw.svg' : 'scr/show-pw.svg'} alt={showPassword ? 'Hide password' : 'Show password'} />
                                    </span>
                                    </div>
                                    <p className='error'>{errorMsg.password}</p>
                                </div>
                            <a href="#" className="btn btn-primary">
                            Go somewhere
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}