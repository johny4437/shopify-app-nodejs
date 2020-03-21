
import React , { useState} from 'react';
import api from '../services/api';


function ProductForm({onSubmit}) {
  const [product_title, setProductTitle] = useState('');
  const [vendor, setVendor] = useState('');
  const [product_type, setProductType] = useState('');
  const [tags, setTags] = useState('');
  const[collection, setCollection] = useState([]);

  async function handleSubmit(e){
    e.preventDefault();
    const data = {
      product_title,
      vendor,
      product_type,
      tags
    };
    //  setProductTitle();
    //  setVendor();
    //  setProductType();
    //  setTags();

     const response = await api.post('/app/create-a-product', data);
     setProductTitle(response.data.product_title);
     setVendor(response.data.vendor);
     setProductType(response.data.product_type);
     setTags(response.data.tags);

     
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="input-form">
      <label>Titulo</label>
      <input 
        name="product_title" 
        id="product_title" 
        value={product_title}
        onChange={e => setProductTitle(e.target.value)}
        
      />
    </div>

    <div className="input-form">
      <label >Vendedor</label>
      <input
        name="vendor"
        id="vendor"
        value={vendor}
        onChange={e => setVendor(e.target.value)}
        
       
      />
    </div>
    <div className="input-form">
      <label >Tipo do Produto</label>
      <input
        name="product_type"
        id="product_type"
        value={product_type}
        onChange={e => setProductType(e.target.value)}
             />
    </div>

    <div className="input-form">
      <label >Tags</label>
      <input
        name="tags"
        id="tags"
        value={tags}
        onChange={e => setTags(e.target.value)}
        
             />
    </div>
    
    <button type="submit">Salvar</button>
  </form>
  );

}
export default ProductForm;