import React, {useState} from 'react';
import './App.css';
import ProductForm from './components/ProductForm';






 function App() {
//   const[collection, setCollection] = useState([]);



//   async function handleCollection(data) {
//   const response = await api.post('/app/create-a-product', data);
//   setCollection([...collection, response.data]);
//   }
  return (

    <div id="App">
      <h1>ADICIONAR NOVOS PRODUTOS</h1>
      <ProductForm />
    </div>
   
   
     
  );
}

export default App;
