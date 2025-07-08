import useLanguage from '@/locale/useLanguage';
import { Button, Spin, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { request } from '@/request';
import { erp } from '@/redux/erp/actions';

const { Paragraph, Title } = Typography;

const ItemNoteSummary = ({ currentErp, entity }) => {
  const translate = useLanguage();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(currentErp?.itemsNoteSummary || 'No summary generated.');

  const handleGenerateSummary = async () => {
    const notes = currentErp?.items
      ?.map((item) => item.notes)
      .filter(Boolean)
      .join('\n');

    if (!notes) {
      setSummary('No notes available to summarize.');
      return;
    }

    try {
      setLoading(true);
      const { result } = await request.post({
        entity: `${entity}/${currentErp._id}/summarize-items-note`,
      });
      dispatch(
        erp.currentItem({
          data: {...currentErp, result},
        })
      );

      setSummary(result ?? 'No summary generated.');
    } catch (error) {
      console.error('AI Item Note Summary Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button type="dashed" loading={loading} onClick={handleGenerateSummary}>
        {translate('Generate Summary')}
      </Button>

      {summary && (
        <div style={{ marginTop: 16 }}>
          <Title level={5}>{translate('Products Note Summary:')}</Title>
          {loading ? (
            <div style={{ marginTop: 12 }}>
              <Spin />
            </div>
          ) : (
            <Paragraph>{summary}</Paragraph>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemNoteSummary;
