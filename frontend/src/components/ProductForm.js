import React from 'react';


function productForm() {
  return (
    <form>
    <div className="input-block">
      <label htmlFor="product_title">Titulo</label>
      <input 
        name="product_title" 
        id="product_title" 
        required
        
      />
    </div>

    <div className="input-block">
      <label htmlFor="vendor">Vendedor</label>
      <input
        name="vendor"
        id="vendor"
        required
      />
    </div>
    <div className="input-block">
      <label htmlFor="product_type">Tipo do Produto</label>
      <input
        name="product_type"
        id="product_type"
        required
      />
    </div>

    <div className="input-block">
      <label htmlFor="tags">Tags</label>
      <input
        name="tags"
        id="tags"
        required
      />
    </div>

    <button type="submit">Salvar</button>
  </form>
  );
}

export default productForm;