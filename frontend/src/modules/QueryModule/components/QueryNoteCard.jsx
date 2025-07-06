import { Card } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useLanguage from '@/locale/useLanguage';

dayjs.extend(relativeTime);

export default function QueryNoteCard({ content, createdAt }) {
  const translate = useLanguage();

  return (
    <Card
      size="small"
      bordered
      style={{ marginBottom: 12}}
    >
      <div style={{ whiteSpace: 'pre-wrap' }}>{translate(content)}</div>

      {createdAt && (
        <div style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
          {translate('Added')} {dayjs(createdAt).fromNow()}
        </div>
      )}
    </Card>
  );
}
