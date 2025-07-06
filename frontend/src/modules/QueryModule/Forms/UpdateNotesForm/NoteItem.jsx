import { useState } from 'react';
import { Row, Col, Input, Button, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function NoteItem({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleUpdate = async () => {
    if (!content.trim()) return;
    setLoadingUpdate(true);
    await onUpdate(note._id, content);
    setIsEditing(false);
    setLoadingUpdate(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    await onDelete(note._id);
    setLoadingDelete(false);
  };

  return (
    <Row gutter={12} style={{ marginBottom: 10 }}>
      <Col span={16}>
        {isEditing ? (
          <Input.TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            autoFocus
          />
        ) : (
          <Text>{note.content}</Text>
        )}
      </Col>

      <Col span={8}>
        <Space>
          {isEditing ? (
            <>
              <Button
                icon={<CheckOutlined />}
                onClick={handleUpdate}
                loading={loadingUpdate}
                type="primary"
              >
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={() => {
                  setContent(note.content); 
                  setIsEditing(false);
                }}
                type='text'
              >
              </Button>
            </>
          ) : (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
                type="text"
              >
              </Button>
              <Button
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                loading={loadingDelete}
                danger
                type="text"
              />
            </>
          )}
        </Space>
      </Col>
    </Row>
  );
}
