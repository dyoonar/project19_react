import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';


function ModalPage(props){
    return(
        <Modal centered 
        show={props.modalShow}
        onHide={()=>props.setModalShow(true)} >

            <Modal.Header>
                <Modal.Title>Detail Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control value={props.dataState.inputNama} onChange={(e)=>props.handleInput('inputNama', e)} type="text" placeholder="Masukan Nama"/>
                <Form.Control value={props.dataState.inputLink} onChange={(e)=>props.handleInput('inputLink', e)} style={{marginTop:'20px', marginBottom:'20px'}} type="text" placeholder="Link Gambar" />
                <Form.Control value={props.dataState.inputKet} onChange={(e)=>props.handleInput('inputKet', e)}as="textarea" type="text" placeholder="Keterangan" />
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>props.closeModal()} variant="outline-secondary">Close</Button>
                <Button onClick={()=>props.simpanData()} variant="outline-success">Simpan</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalPage;