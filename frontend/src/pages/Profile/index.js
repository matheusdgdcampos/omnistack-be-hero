import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import swal from 'sweetalert';

import api from '../../services/api';

import './styles.css';

export default function Profiler() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        /**
         * Função para excluir um caso.
         */
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })
            /**
             * Tratativa de erro que verifica se o caso cadastrado
             * pertence o id que está na tentaiva de exclui-lo
             * se pertence a sua lista e retornar true, a ação
             * é feita, se retornar false ele nem se quer exibe.
             */
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            swal({
                title: "Erro!",
                text: "Erro ao deletar caso, tente novamente.",
                icon: "error",
                buttons: "Ok"
            })
        }
    }

    function handleLogout() {
        // Limpando o Local-Storage.
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {/* Aqui é feito um binding de todos os casos que pertencem a ONG. */}
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })
                            .format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}