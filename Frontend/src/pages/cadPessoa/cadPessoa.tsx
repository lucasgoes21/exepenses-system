import { useState } from 'react'

import './style.css'

function CadPessoa() {

  return (
      <div className='cadPessoa'>
        <form >
          <input name='nome' type="text" />
          <input name='idade' type="number" />
          <button type='button'>Cadastrar</button>
        </form>
      </div>
  )
}

export default CadPessoa
