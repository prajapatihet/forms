import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

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

        let oldUserData = [...userData, currentUserFormData]

        setUserData(oldUserData)

        event.preventDefault()
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
                    <Col lg={7}></Col>
                </Row>
            </Container>
        </Container>
    )
}
