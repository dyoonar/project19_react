import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Card} from 'react-bootstrap';

class MainPage extends Component{
    constructor(props){
        super(props)
        this.state={
            dataKaryawan:[],
            inputNama:'',
            inputJabatan: '',
            inputJk: '',
            inputTtl: ''
        }
        this.panggilSemua = this.panggilSemua.bind(this)
        this.simpanData = this.simpanData.bind(this)
        this.handleInput = this.handleInput.bind(this)

    }

    panggilSemua(){
        fetch('http://localhost:3000/data-karyawan')
        .then((response)=> response.json())
        .then((hasil)=> this.setState({dataKaryawan: hasil}))
    }       

    componentDidMount(){
        this.panggilSemua()
    }

    hapusData(id){
        fetch(`http://localhost:3000/data-karyawan/${id}`, {
            method: 'DELETE',
        }).then((response =>{alert('data sudah kehapus')
        this.panggilSemua()
    }))
    }

    simpanData(){
        if(this.state.inputNama === "" || this.state.inputJabatan === "" || this.state.inputJK === "" || this.state.inputTtl === ""){
            alert("silahkan isi data")
        }else{
            alert("Sudah isi data")
        }
    }

    handleInput(value, e){
        this.setState({[value]: e.target.value})
    }

    render(){
        
        return(
            handleInput={this.handleInput}
        simpanData={this.simpanData}
            <Container>
                <Row>
                    <Col>
                        <Form.Control type="text" value={dataState.inputNama} onChange={(e)=>handleInput('inputNama', e)} placeholder="Masukan Nama"/>
                    </Col>
                    <Col>
                        <Form.Control type="text" value={this.state.inputNama} placeholder="Masukan Jabatan"/>
                    </Col>
                    <Col>
                        <Form.Control type="text" value={this.state.inputNama} placeholder="Masukan Jenis Kelamin"/>
                    </Col>
                    <Col>
                        <Form.Control type="date" value={this.state.inputNama} placeholder="Masukan TTL"/>
                    </Col>
                    <Col>
                        <Button onClick={simpanData()} variant="primary">Simpan Data</Button>
                    </Col>
                </Row>
                
                    {
                        this.state.dataKaryawan.map((value, index)=>{
                            return(
                                <Card style={{ width:'300px', marginTop:'30px', marginLeft:'30px'}} key={index}>
                                    <Card.Body>
                                        <Card.Title>Nama : {value.nama_karyawan}</Card.Title>
                                        <Card.Text>Jabatan : {value.jabatan}</Card.Text>
                                        <Card.Text>Jenis Kelamin : {value.jenis_kelamin}</Card.Text>
                                        <Card.Text>Tanggal Lahir : {value.tanggal_lahir}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button onClick={()=>this.hapusData(value.id)} variant="outline-danger" style={{marginRight:'5%', marginLeft:'20%'}}>Hapus</Button>
                                        <Button variant="success">Edit</Button>
                                    </Card.Footer>
                                </Card>
                        )
                    })    
                }
                
            </Container>
        )
    }
}
export default MainPage;