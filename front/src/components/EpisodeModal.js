import { Modal } from "antd";
import React from "react";

function EpisodeModal({ openModal, setOpenModal, loading, episodeContent }) {
  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      style={{ maxWidth: "95vw" }}
    >
      <pre>{JSON.stringify(episodeContent, null, 2)}</pre>
    </Modal>
  );
}

export default EpisodeModal;
