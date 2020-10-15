import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

const CrudModalSearch = (props) => {
  const {
    className,
    children,
    onClick
  } = props;

  const [modal, setModal] = useState(false);
  const [backdrop] = useState('static');
  const toggle = () => setModal(!modal);
  const open = () => {
    setModal(true);
  }
  const filters = [];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Identifica os campos do formulário filho.
    let fields = e.target;
    let filter = null;
    let operation = null;

    // Gera o array de filtros baseando-se 
    // no campo 'name' dos componentes do form.
    for (var i = 0; i < fields.length; i++) {
      if (e.target[i].name !== "") {   
        if(e.target[i].type === "text") {
          operation = "MATCH";
        } 
             
        filter = {
          field: e.target[i].name,
          value: e.target[i].value,
          operation: operation
        };
        
        filters.push(filter);
      }
    }

    onClick(filters);
  }

  return (
    <div>
      <Button className="crud-btnSearch" onClick={open}><FontAwesomeIcon icon={faSearch} className="mr-2" />{i18next.t("button.advancedSearch")}</Button>

      <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop}>
        <ModalHeader toggle={toggle}>{i18next.t("crud.modalSearch.title")}</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="secondary">{i18next.t("button.search")}</Button>{' '}
            <Button color="danger" onClick={toggle}>{i18next.t("button.close")}</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default withTranslation()(CrudModalSearch);