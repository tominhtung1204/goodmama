import { Modal, Button } from 'react-bootstrap';
const ModalAdmin = props => {
  const {
    size,
    title,
    hanlerChanged,
    titleButtonCancel,
    titleButtonComfirm,
    hideFooter,
    ...rest
  } = props;
  return (
    <Modal
      {...rest}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {title && (
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      {hideFooter === false && (
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            {titleButtonCancel}
          </Button>
          <Button type="submit" onClick={() => hanlerChanged()}>
            {titleButtonComfirm}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalAdmin;
