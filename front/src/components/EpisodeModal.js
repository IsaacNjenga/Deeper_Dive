import { Col, Image, Modal, Row, Typography, Space, Tag } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  NumberOutlined,
} from "@ant-design/icons";

import { formatDuration } from "../pages/Episodes";

const { Title, Paragraph } = Typography;

function EpisodeModal({ openModal, setOpenModal, loading, episodeContent }) {
  if (!episodeContent) return null;

  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      centered
      width={720}
      bodyStyle={{
        padding: 24,
        margin: 10,zIndex:10000
      }}
    >
      <Row gutter={[24, 24]}>
        {/* Cover */}
        <Col
          xs={24}
          md={10}
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <Image
            src={episodeContent?.cover}
            alt="cover"
            preview={false}
            style={{
              borderRadius: 5,
              objectFit: "cover",
              width: "100%",
              height: "100%",
              maxHeight: 350,
            }}
          />
        </Col>

        {/* Info */}
        <Col
          xs={24}
          md={14}
          style={{
            background: "whitesmoke",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {/* Title */}
            <Title level={2} style={{ margin: 0, fontFamily: "Raleway" }}>
              {episodeContent?.title}
            </Title>

            {/* Meta */}
            <Space size={[8, 8]} wrap>
              <Tag icon={<NumberOutlined />} color="grey">
                Episode {episodeContent?.episode}
              </Tag>
              <Tag icon={<CalendarOutlined />} color="#4a4a89">
                Aired: {episodeContent?.timestamp}
              </Tag>
              <Tag icon={<ClockCircleOutlined />} color="#f6032c">
                Duration: {formatDuration(episodeContent?.duration)}
              </Tag>
            </Space>

            {/* Description */}
            <Paragraph
              style={{
                fontFamily: "Roboto",
                marginTop: 8,
                fontSize: 18,
                lineHeight: 1.2,
                color: "#555",
              }}
            >
              {episodeContent?.description}
            </Paragraph>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default EpisodeModal;
