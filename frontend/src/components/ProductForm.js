import React from 'react';


function productForm() {
  return (
    <form>
    <div className="input-block">
      <label htmlFor="github_username">Usuário do Github</label>
      <input 
        name="github_username" 
        id="github_username" 
        required
        
      />
    </div>

    <div className="input-block">
      <label htmlFor="techs">Tecnologias</label>
      <input
        name="techs"
        id="techs"
        required
      />
    </div>

    <div className="input-group">
      <div className="input-block">
        <label htmlFor="latitude">Latitude</label>
        <input 
          type="number" 
          name="latitude" 
          id="latitude" 
        />
      </div>

      <div className="input-block">
        <label htmlFor="longitude">Longitude</label>
        <input
          type="number"
          name="longitude"
          id="longitude"
          required
        />
      </div>
    </div>

    <button type="submit">Salvar</button>
  </form>
  );
}

export default productForm;