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
            inputTtl: '',
            idInput: ''
        }
        this.panggilSemua = this.panggilSemua.bind(this)
        this.simpanData = this.simpanData.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.clearInput = this.clearInput.bind(this)

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
        }else if(this.state.idInput === ''){
            fetch('http://localhost:3000/data-karyawan',{
                method: 'POST',
                body: JSON.stringify({
                    nama_karyawan: this.state.inputNama, 
                    jabatan: this.state.inputJabatan,
                    jenis_kelamin: this.state.inputJk,
                    tanggal_lahir: this.state.inputTtl,
                }),
                headers:{
                    'Content-type': 'application/json; charshet=UTF-8',
                },
            }).then((response)=>response.json())
            .then((result =>{
                alert("berhasil tambah data");
                this.clearInput();
                this.panggilSemua();
            }))
        }else{
            fetch(`http://localhost:3000/data-karyawan/${this.state.idInput}`,{
                method: 'PUT',
                body: JSON.stringify({
                    nama_karyawan: this.state.inputNama, 
                    jabatan: this.state.inputJabatan,
                    jenis_kelamin: this.state.inputJk,
                    tanggal_lahir: this.state.inputTtl,
                }),
                headers:{
                    'Content-type': 'application/json; charshet=UTF-8',
                },
            }).then((response)=>response.json())
            .then((result =>{
                alert("berhasil simpan data");
                this.clearInput();
                this.panggilSemua();
            }))
        }
    }

    handleInput(value, e){
        this.setState({[value]: e.target.value})
               
    }

    clearInput(){
        this.setState(
            {
                inputNama:'',
                inputJabatan: '',
                inputJk: '',
                inputTtl: '',
                idInput:''
            }
        )
    }

    panggilById(id){
        fetch(`http://localhost:3000/data-karyawan/${id}`)
        .then((response)=>response.json())
        .then((hasil=>{
            // this.props.setModalShow(true)
            this.setState(
                {
                    inputNama: hasil.nama_karyawan,
                    inputJabatan: hasil.jabatan,
                    inputJk: hasil.jenis_kelamin,
                    inputTtl: hasil.tanggal_lahir,
                    idInput: hasil.id
                }
            )
                       
        }))
        
    }

    render(){
        
        return(
            <Container>
                <Row 
                dataState={this.state}
                handleInput={this.handleInput}
                >
                    <Col>
                        <Form.Control type="text" value={this.state.inputNama} onChange={(e)=>this.handleInput('inputNama', e)} placeholder="Masukan Nama"/>
                    </Col>
                    <Col>
                        <Form.Control type="text" value={this.state.inputJabatan} onChange={(e)=>this.handleInput('inputJabatan', e)} placeholder="Masukan Jabatan"/>
                    </Col>
                    <Col>
                        <Form.Control type="text" value={this.state.inputJk} onChange={(e)=>this.handleInput('inputJk', e)} placeholder="Masukan Jenis Kelamin"/>
                    </Col>
                    <Col>
                        <Form.Control type="date" value={this.state.inputTtl} onChange={(e)=>this.handleInput('inputTtl', e)} placeholder="Masukan TTL"/>
                    </Col>
                    <Col>
                        <Button onClick={()=>this.simpanData()} variant="primary">Simpan Data</Button>
                    </Col>
                </Row>
                
                    {
                        this.state.dataKaryawan.reverse().map((value, index)=>{
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
                                        <Button onClick={()=>this.panggilById(value.id)} variant="success">Edit</Button>
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