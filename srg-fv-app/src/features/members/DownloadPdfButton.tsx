import { useTranslation } from 'react-i18next';
import { MembershipPdf } from '../../../../srg-fv-contract/membershipPdf';
import { GetMembershipPdfOptions } from '../../../../srg-fv-contract/getMembershipPdfOptions';
import axios from 'axios';
import { Button } from '../../shared/buttons/Button';

export function DownloadPdfButton({
  id,
  config,
}: {
  id: number;
  config: { headers: { authorization: string } };
}) {
  const { t } = useTranslation();

  async function downloadPdf(id: number) {
    const body = {
      id: id,
    } as GetMembershipPdfOptions;

    axios({
      method: 'post',
      url: import.meta.env.VITE_BACKEND_URL + 'membership/pdf',
      headers: config.headers,
      data: body,
    }).then((res) => {
      const result = res.data as MembershipPdf;
      const source = `data:application/pdf;base64,${result.base64}`;
      const downloadLink = document.createElement('a');
      downloadLink.href = source;
      downloadLink.download = result.fileName;
      downloadLink.click();
    });
  }

  return (
    <Button
      variant='contained'
      color='secondary'
      onClick={() => downloadPdf(id)}>
      {t('downloadPdf')}
    </Button>
  );
}
