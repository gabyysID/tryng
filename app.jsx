import React, { useState } from 'react';
import axios from 'axios';
import './App.css'


const App = () => {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [mensagem, setMensagem] = useState('');

  const adicionarLivro = async (e) => {
    e.preventDefault();
    if (titulo && autor && ano) {
      const novoLivro = { titulo, autor, ano };
      try {
        const response = await axios.post('http://localhost:5000/livros', novoLivro);
        if (response.status === 201) {
          setLivros([...livros, response.data]);
          setTitulo('');
          setAutor('');
          setAno('');
          setMensagem('Livro adicionado com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao adicionar o livro:', error);
        setMensagem('Erro ao adicionar o livro.');
      }
    } else {
      setMensagem('Por favor, preencha todos os campos.');
    }
  };

  const pesquisarLivro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/livros?q=${pesquisa}`);
      if (response.data.length > 0) {
        const livroEncontrado = response.data[0]; 
        setMensagem(`Livro encontrado: ${livroEncontrado.titulo} de ${livroEncontrado.autor} (${livroEncontrado.ano})`);
      } else {
        setMensagem('Livro não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao pesquisar o livro:', error);
      setMensagem('Erro ao pesquisar o livro.');
    }
    setPesquisa('');
  };

  return (
    <div>
      <h1>Biblioteca</h1>

      <h2>Adicionar Livro</h2>
      <form onSubmit={adicionarLivro}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <h2>Pesquisar Livro</h2>
      <form onSubmit={pesquisarLivro}>
        <input
          type="text"
          placeholder="Pesquisar por título, autor ou ano"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      <h2>Livros Adicionados</h2>
      <ul>
        {livros.map((livro, index) => (
          <li key={index}>{livro.titulo} de {livro.autor} ({livro.ano})</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
