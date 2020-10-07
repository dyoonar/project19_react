import React, {Component} from 'react';
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import ModalPage from './ModalPage';

class Body extends Component{
    constructor(props){
        super(props)
        this.state={
            dataGambar:[],
            valueSearch: '',
            inputNama:'',
            inputLink: '',
            inputKet: ''

        }
        this.panggilSemua = this.panggilSemua.bind(this)
        this.search = this.search.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.clearInput = this.clearInput.bind(this)
        this.simpanData = this.simpanData.bind(this)
        this.panggilById = this.panggilById.bind(this)
    }
    handleInput(value, e){
        this.setState({[value]: e.target.value})
    }

    search(e){
        this.setState({valueSearch: e.target.value})
    }

    closeModal(){
        this.props.setModalShow(false)
        this.clearInput()
    }

    clearInput(){
        this.setState(
            {
                inputNama:'',
                inputLink:'',
                inputKet:'',
                idInput:''
            }
        )
    }

    panggilById(id){
        fetch(`http://localhost:3000/pustakagambar/${id}`)
        .then((response)=>response.json())
        .then((hasil=>{
            this.props.setModalShow(true)
            this.setState(
                {
                    inputNama: hasil.nama,
                    inputLink: hasil.linkgambar,
                    inputKet: hasil.ket,
                    idInput: hasil.id
                }
            )
                       
        }))
        
    }
    simpanData(){
        if(this.state.inputNama === "" || this.state.inputLink === "" || this.state.inputKet === ""){
            alert("silahkan isi data")
        }else if(this.state.idInput === ''){
            // alert("sipp, data sudah di isi")
            fetch('http://localhost:3000/pustakagambar',{
                method: 'POST',
                body: JSON.stringify({
                    nama: this.state.inputNama, 
                    linkgambar: this.state.inputLink,
                    ket: this.state.inputKet,
                }),
                headers:{
                    'Content-type': 'application/json; charshet=UTF-8',
                },
            }).then((response)=>response.json())
            .then((result =>{
                this.closeModal()                
                this.panggilSemua()
                alert("berhasil tambah data");
            }))            
       }else{
        fetch(`http://localhost:3000/pustakagambar/${this.state.idInput}`,{
            method: 'PUT',
            body: JSON.stringify({
                nama: this.state.inputNama,
                linkgambar: this.state.inputLink,
                ket: this.state.inputKet
            }),
            headers:{
                'Content-type': 'application/json; charshet=UTF-8',
            },
        })
            .then((response)=>response.json())
            .then((hasil=>{
                this.panggilSemua();
                this.props.setModalShow(false);
                this.clearInput();
            }
                ))
       }
    }

    hapusData(id){
        fetch(`http://localhost:3000/pustakagambar/${id}`, {
            method: 'DELETE',
        }).then((response =>{alert('data sudah kehapus')
        this.panggilSemua()
    }))
    }
    panggilSemua(){
        fetch('http://localhost:3000/pustakagambar')
        .then((response)=> response.json())
        .then((hasil)=> this.setState({dataGambar: hasil}))
    }       

    componentDidMount(){
        this.panggilSemua()
    }

    render(){
        console.log(this.state.valueSearch)
        return(
            <Container>
                <ModalPage
                modalShow={this.props.modalShow}
                setModalShow={this.props.setModalShow}
                closeModal={this.closeModal}
                handleInput={this.handleInput}
                dataState={this.state}
                simpanData={this.simpanData}
                />

                <Row style={{marginTop: '30px'}}> 
                    <Col lg={10}>
                        <Form.Control type="text" placeholder="cari gambar" value={this.state.valueSearch} onChange={(e)=>this.search(e)}/>
                    </Col>
                    <Col lg={2}>
                        <Button onClick={()=>this.props.setModalShow(true)} varian="primary">Tambah Data</Button>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.dataGambar.reverse().filter(valueFilter => valueFilter.nama.toLowerCase().includes(this.state.valueSearch.toLowerCase())).map((value, index)=>{
                            return(
                                <Card style={{ width:'300px', marginTop:'30px', marginLeft:'30px'}} key={index}>
                                    <Card.Img variant="top" src={value.linkgambar}/>
                                    <Card.Body>
                                        <Card.Title>{value.nama}</Card.Title>
                                        <Card.Text>{value.ket}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button onClick={()=>this.hapusData(value.id)} variant="outline-primary" style={{marginRight:'5%'}}>Hapus</Button>
                                        <Button onClick={()=>this.panggilById(value.id)} variant="outline-danger">Edit</Button>
                                    </Card.Footer>
                                </Card>
                        )
                    })    
                }
                </Row>

            </Container>
        )
    }
}
export default Body;