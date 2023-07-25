import React, { useEffect, useState } from 'react'
import Menu from '../Menu'
import Footer from '../Footer'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Edit_service() {
  const navigate = useNavigate();
  const [selectedFile, setselectedFile] = useState("");
  const d = useParams();
  const [title, settitle] = useState("");
  const [icon, seticon] = useState("");
  const [descript, setdescript] = useState("");
  const [photo, setphoto] = useState("");
  const [msg, setmsg] = useState("");

  useEffect(()=>{
      axios.post('http://localhost/fleet_manage/backend/Service/editservice', {
          id: d.id,
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':localStorage.getItem('token')
          },
      }
      )
      .then(function(response){
          let data=response.data;
         setphoto(data.user.photo);
         settitle(data.user.title);
         setdescript(data.user.descript);
         seticon(data.user.icon);
          
      })
  },[]);
  const update = () => {

    const formdata=new FormData();
    formdata.append('photo',selectedFile);
    formdata.append('title',title);
    formdata.append('descript',descript);
    formdata.append('icon',icon);
     
    
 
    fetch('http://localhost/fleet_manage/backend/Service/updateservice/'+d.id,{
        method:'POST',
        body:formdata

    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        settitle('')
        setdescript('')
        seticon('')
        setselectedFile('')
        setphoto('')
        // setdocuments('')
        
        
        setTimeout(()=>navigate('/service_list'), 3000)
      });
}
  return (
       <>
         <div className="hold-transition sidebar-mini">
        <div className="wrapper">
          <Menu/>
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Edit Services</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        {/* <a href='#'>Home</a> */}
                      </li>
                      <li className="breadcrumb-item active">Edit Services</li>
                    </ol>
                  </div>
                  <h3>{msg}</h3>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card card-primary card-outline">
                      <div className="card-header">
                        <h5 className="m-0">Edit Services</h5>
                      </div>

                      <section class="content">
                        <div class="container-fluid">
                          <div>
                            <div class="card-body">
                              <div class="row">
                                <div class="col-sm-6 col-md-4">
                                  <div class="form-group">
                                    <label class="form-label">
                                      Title<span class="form-required">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="title"
                                      placeholder="Input title"
                                      onChange={(e) => settitle(e.target.value)}
                                      value={title}
                                    />
                                  </div>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                  <div class="form-group">
                                    <label class="form-label">
                                      Photo<span class="form-required">*</span>
                                    </label>
                                    <input
                                      type="file"
                                      class="form-control"
                                      // name="photo"
                                      onChange={(e) =>
                                        setselectedFile(e.target.files[0])
                                      }
                                    />
                                    <img
                                  src={`http://localhost/fleet_manage/backend/uploads/${photo}`}
                                  style={{ width: "250px", height: "200px" }}
                                />
                                  </div>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                  <div class="form-group">
                                    <label class="form-label">
                                      Icon<span class="form-required">*</span>
                                    </label>
                                    <input
                                      type="file"
                                      class="form-control"
                                      name="icon"
                                      placeholder="Add Icon"
                                      onChange={(e) =>
                                        seticon(e.target.files[0])
                                      }
                                    />
                                    <img
                                  src={`http://localhost/fleet_manage/backend/uploads/${icon}`}
                                  style={{ width: "250px", height: "200px" }}
                                />
                                    
                                  </div>
                                </div>

                                <div class="col-sm-6 col-md-4">
                                  <div class="form-group">
                                    <label class="form-label">
                                      Address
                                      <span class="form-required">*</span>
                                    </label>
                                    <textarea
                                      class="form-control"
                                      placeholder="Description"
                                      name="descript"
                                      onChange={(e) =>
                                        setdescript(e.target.value)
                                      }
                                      value={descript}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>

                              <div class="modal-footer">
                                <button
                                  type="submit"
                                  class="btn btn-primary"
                                  onClick={update}
                                >
                                   Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      {/* <!-- /.content --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
       </>
  )
}
