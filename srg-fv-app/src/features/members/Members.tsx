import axios from 'axios';
import { useEffect, useState } from 'react';
import { ShortMembership } from '../../../../srg-fv-contract/shortMembership';
import { useTranslation } from 'react-i18next';
import useKeycloak from '../../shared/useKeycloak';
import { ConfirmationModal } from '../../shared/ConfirmationModal';
import { DownloadPdfButton } from './DownloadPdfButton';
import { DeleteButton } from '../../shared/DeleteButton';
import { Pagination } from '../../shared/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';

export function Members() {
  const { t } = useTranslation();
  const { keycloak } = useKeycloak();
  const [members, setMembers] = useState<ShortMembership[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [maxPage, setMaxPage] = useState(1);
  const [show, setShow] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState<number | null>(null);

  const config = {
    headers: {
      authorization: `Bearer ${keycloak?.token}`,
    },
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + 'membership', {
        ...config,
        params: {
          page: currentPage > 0 ? currentPage : 1,
          search: encodeURI(search),
        },
      })
      .then((res) => {
        setMembers(res.data.memberships as ShortMembership[]);
        setMaxPage(res.data.maxPage);
        setCurrentPage(
          res.data.currentPage > res.data.maxPage
            ? res.data.maxPage
            : res.data.currentPage,
        );
      });
  }, [currentPage, search]);

  return (
    <>
      <TableContainer sx={{ marginBottom: 2 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='h6'>{t('firstname')}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>{t('lastname')}</Typography>
              </TableCell>
              <TableCell sx={{ width: '40%' }}>
                <TextField
                  label={
                    <>
                      <SearchIcon /> {t('search')}
                    </>
                  }
                  variant='standard'
                  value={search}
                  size='small'
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ width: '100%' }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell className='text-end'>
                  <DownloadPdfButton
                    id={member.id}
                    config={config}></DownloadPdfButton>

                  <DeleteButton
                    id={member.id}
                    setDeleteId={setDeleteMemberId}
                    setShow={setShow}></DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={maxPage}></Pagination>

      <ConfirmationModal
        open={show}
        title={t('deleteMemberTitle', {
          name: `${members.find((m) => m.id == deleteMemberId)?.lastName}, ${members.find((m) => m.id == deleteMemberId)?.firstName}`,
        })}
        message={t('deleteMemberMessage', {
          name: `${members.find((m) => m.id == deleteMemberId)?.lastName}, ${members.find((m) => m.id == deleteMemberId)?.firstName}`,
        })}
        buttonText={t('delete')}
        handleClose={() => {
          setShow(false);
        }}
        handleConfirm={() => {
          setShow(false);
          axios
            .delete(
              import.meta.env.VITE_BACKEND_URL + 'membership/' + deleteMemberId,
              config,
            )
            .then(() => {
              setMembers(members.filter((m) => m.id !== deleteMemberId));
            });
        }}></ConfirmationModal>
    </>
  );
}
