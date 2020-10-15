import React from 'react';
import Loading from '../components/loading';
import AppLogo from '../../assets/appLogo.svg';
import { Container} from 'reactstrap';

/**
 * Template base para as telas acessíveis sem 
 * necessidade de autenticação do usuário. 
 */
function baseTemplate(props) {
    return (
        <Container fluid={true} className="mt-5 p-3">
            { /* Logo da aplicação */}
            <img src={AppLogo} className="img-fluid mx-auto d-block mb-5" />
            
            { /* Responsável por exibir o conteudo do formulário */ }
            {props.children}

            { /* Componente de loading fullscreen */}
            <Loading loading={props.loading} />
        </Container>
    );
}

export default baseTemplate;