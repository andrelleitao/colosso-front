import React, { useState } from 'react';
import Loading from '../../../components/loading';

export default function CrudBaseTemplate(props) {
    // Responsável por armazenar o método search
    // que é responsável por realizar pesquisa no Grid.
    // Método responsável por armazenar o callback do search do grid.
    // Após o armazenamento na variável callbackSearchGrid este poderá
    // ser acionado por qualquer método da classe. Esse método será acionado
    // quando o usuário clica nos ícones de Editar ou Remover do grid.
    const [callbackSearchGrid, setCallbackSearchGrid] = useState(null);

    return (                     
        <>                
            { props.children }
            <Loading loading={props.loading} />
        </>
    );
}