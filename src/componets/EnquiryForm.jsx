import React, { useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EnquiryForm() {
    let [formData, setFormData] = useState(
        {
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
        }
    )
    let getValue = (event) => {
        let oldData = { ...formData };
        let inputName = event.target.name;
        let inputValue = event.target.value;
        oldData[inputName] = inputValue;
        setFormData(oldData);
    }
    let [userData, setUserData] = useState([]);
    let handleSubmit = (event) => {
        let currentUserFormData = {
            uname: formData.uname,
            uemail: formData.uemail,
            uphone: formData.uphone,
            umessage: formData.umessage
        }
        if (formData.index === "") {
            let checkUserExists = userData.filter((v) => v.uemail === formData.uemail || v.uphone === formData.uphone);
            if (checkUserExists.length === 0) {
                let oldUserData = [...userData, currentUserFormData]
                setUserData(oldUserData)
                toast.success("Data inserted Successfully")
                setFormData(
                    {
                        uname: '',
                        uemail: '',
                        uphone: '',
                        umessage: '',
                        index: ''
                    }
                )
            }
            else {
                // alert('User already exists')
                toast.error("User Already Exists")
            }
        } else {
            let editIndex = formData.index;
            let oldData = userData;

            let checkUserExists = userData.filter((v, i) => (v.uemail === formData.uemail || v.uphone === formData.uphone) && i !== editIndex);

            if (checkUserExists.length === 0) {
                oldData[editIndex]['uname'] = formData.uname;
                oldData[editIndex]['uemail'] = formData.uemail;
                oldData[editIndex]['uphone'] = formData.uphone;
                oldData[editIndex]['umessage'] = formData.umessage;

                setUserData(oldData)
                toast.success("Data Updated Successfully")
                setFormData(
                    {
                        uname: '',
                        uemail: '',
                        uphone: '',
                        umessage: '',
                        index: ''
                    }
                )
            } else {
                toast.error("User Already Exists")
            }

        }
        event.preventDefault()
    }
    let deleteRow = (num) => {
        let filterDataAfterDelete = userData.filter((v, i) => i !== num)
        setUserData(filterDataAfterDelete)
        toast.success("Data Deleted Successfully")
    }

    let editRow = (num) => {
        let editData = userData.filter((v, i) => i === num)[0];
        editData['index'] = num
        setFormData(editData)
    }
    return (
        <Container fluid>
            <Container>
                <Row>
                    <Col className='text-center py-5'>
                        <h1>Enquiry Now!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={5}>
                        <form onSubmit={handleSubmit}>
                            <div className='text-start pb-3'>
                                <label className='form-label'>Name</label>
                                <input type='text' onChange={getValue} value={formData.uname} name='uname' className='form-control' />
                            </div>
                            <div className='text-start pb-3'>
                                <label className='form-label'>Email</label>
                                <input type='email' onChange={getValue} value={formData.uemail} name='uemail' className='form-control' />
                            </div>
                            <div className='text-start pb-3'>
                                <label className='form-label'>Phone</label>
                                <input type='text' onChange={getValue} value={formData.uphone} name='uphone' className='form-control' />
                            </div>
                            <div className='text-start pb-3'>
                                <label className='form-label'>Message</label>
                                <textarea type='text' onChange={getValue} value={formData.umessage} name='umessage' rows={3} className='form-control' />
                            </div>
                            <button className='btn btn-primary'>
                                {formData.index !== "" ? 'Update' : 'Submit'}

                            </button>
                        </form>
                    </Col>
                    <Col lg={7}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData.length >= 1
                                        ?
                                        userData.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.uname}</td>
                                                    <td>{item.uemail}</td>
                                                    <td>{item.uphone}</td>
                                                    <td>{item.umessage}</td>
                                                    <td>
                                                        <button onClick={() => editRow(index)}>&#9998;</button>&nbsp;&nbsp;
                                                        <button onClick={() => deleteRow(index)}>&#10007;</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan={6}>No Data Found</td>
                                        </tr>
                                }

                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </Container>
    )
}
