import axios from "axios";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const Editarticle = () => {

  const navigate=useNavigate()

  const { id } = useParams();

  const[article,setArticle]=useState({
    reference:"",
    marque:"",
    designation:"",
    prix:0,
    qtestock:0,
    imageart:"",
    scategorieID:""
  })

  const[scategories,setScategories]=useState([])

  useEffect(()=>{
    getscategories()
  },[]);

    useEffect(()=>{
    loadArticle()
  },[]);


  const handleChange=(e)=>{
    setArticle({...article,[e.target.name]:e.target.value})
  }

  const loadArticle = async () => {
    const result = await
    axios.get(`http://localhost:3001/api/articles/${id}`);
    setArticle(result.data);
    };

  const getscategories=async()=>{
    try {
      const res=await axios.get("http://localhost:3001/api/scategories")
      setScategories(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const save = async()=>{
await axios.put(`http://localhost:3001/api/articles/${id}`,article)
navigate("/listart");
  }

  return (
<div className="container">
<div className="row">
<div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
<h4 align="center">Edit Article</h4>
<div className='form mt-3'>
<Form className="border p-3" >
<Row className="mb-2">
<Form.Group as={Col} md="6" >
<Form.Label >Référence *</Form.Label>
<Form.Control
required
type="text"
placeholder="Référence"
name="reference"
value={article.reference}
onChange={(e)=>handleChange(e)}
/>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Désignation *</Form.Label>
<Form.Control
required
type="text"
placeholder="Désignation"
name="designation"
value={article.designation}
onChange={(e) => handleChange(e)}
/>
</Form.Group>
</Row>
<Row className="mb-2">
<Form.Group className="col-md-6">
<Form.Label>Marque *</Form.Label>
<Form.Control
type="text"
required
placeholder="Marque"
name="marque"
value={article.marque}
onChange={(e) => handleChange(e)}
/>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Prix</Form.Label>
<Form.Control
type="number"
placeholder="Prix"
name="prix"
value={article.prix}
onChange={(e) => handleChange(e)}
/>
</Form.Group>
</Row>
<Row className="mb-3">
<Form.Group className="col-md-6 ">
<Form.Label>
Qté stock<span className="req-tag">*</span>
</Form.Label>
<Form.Control
required
type="number"
value={article.qtestock}
onChange={(e) => handleChange(e)}
placeholder="Qté stock"
name="qtestock"
/>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Image</Form.Label>
<Form.Control
type="text"
placeholder="Image"
value={article.imageart}
name="imageart"
onChange={(e) => handleChange(e)}
/>
</Form.Group>
<Form.Group as={Col} md="12">
<Form.Label>Catégorie</Form.Label>
<Form.Control
as="select"
type="select"
name="scategorieID"
value={article.scategorieID}
onChange={(e) => handleChange(e)}
>
{scategories.map((scat,index)=>
<option key={index} value={scat._id}>{scat.nomscategorie}</option>
)}
</Form.Control>
</Form.Group>
</Row>
<button type="submit" className="btn btn-outline-primary">
Submit
</button>
<Link className="btn btn-outline-danger mx-2" to="/articles">
Cancel
</Link>
</Form>
</div>
</div>
</div>
</div>

  )
}

export default Editarticle
