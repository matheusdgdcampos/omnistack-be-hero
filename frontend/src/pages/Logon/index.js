import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import swal from 'sweetalert';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    /**
     * Definindo o estado das propriedades.
     */
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        /**
         * Função para previnir que seja carregada a página por completo.
         */
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            /**
             * Guardando os dados da sessão no local-storage.
             */
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            swal({
                title: "Erro!",
                text: "Falha no login, tente novamente.",
                icon: "error",
                buttons: "Ok"
            })
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}   //Definindo a mudança de estado.
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                    Não tenho Cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heros" />
        </div>
    );
}