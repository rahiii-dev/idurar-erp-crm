import { Form, Button, Input, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function CreateNotesForm() {
  const translate = useLanguage();

  return (
    <Form.List name="notes">
      {(fields, { add, remove }) => (
        <>
          <Row style={{ marginTop: 20, marginBottom: 10 }}>
            <Col span={12}>
              <strong>{translate('Notes')}</strong>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button onClick={() => add()} type="dashed" icon={<PlusOutlined />}>
                {translate('Add Note')}
              </Button>
            </Col>
          </Row>

          {fields.map(({ key, name, ...restField }) => (
            <Row key={key} gutter={12} style={{ marginBottom: 10 }}>
              <Col span={22}>
                <Form.Item
                  {...restField}
                  name={[name, 'content']}
                  rules={[{ required: true, message: translate('Please enter note content') }]}
                >
                  <Input.TextArea placeholder={translate('Note content')} rows={2} />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button
                  onClick={() => remove(name)}
                  icon={<DeleteOutlined />}
                  danger
                  type="text"
                />
              </Col>
            </Row>
          ))}
        </>
      )}
    </Form.List>
  );
}
