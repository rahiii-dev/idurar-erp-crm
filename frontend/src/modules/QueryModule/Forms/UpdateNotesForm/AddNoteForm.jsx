import { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function AddNoteForm({ onAdd }) {
  const translate = useLanguage();

  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newNote.trim()) return;
    setLoading(true);
    await onAdd(newNote);
    setNewNote('');
    setLoading(false);
  };

  return (
    <Row gutter={12} style={{ marginBottom: 10 }}>
      <Col span={20}>
        <Input.TextArea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder={translate('Add new note')}
          rows={2}
        />
      </Col>
      <Col span={4}>
        <Button
          icon={<PlusOutlined />}
          onClick={handleAdd}
          type="dashed"
          loading={loading}
        />
      </Col>
    </Row>
  );
}
