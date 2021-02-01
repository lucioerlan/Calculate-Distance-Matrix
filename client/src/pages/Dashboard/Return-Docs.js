import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import { formatDistance, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import SkeletonDocs from 'src/components/Skeleton';
import io from 'socket.io-client';
import api from 'src/service/api';

export default () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socket = io(process.env.REACT_APP_SOCKET_URL, {
          transports: ['websocket'],
          upgrade: false,
        });
        const { data } = await api.get('/get-files');

        setItem(data.message, setLoading(false));

        socket.once('post', () => {
          fetchData();
        });
        
      } catch (error) {
        throw new Error('Error Data!');
      }
    };
    fetchData();
  }, []);

  return (
    <Box id="file-container">
      {loading ? <SkeletonDocs /> : null}
      <Box component="ul">
        {item.map(file => (
          <Box component="li" key={file.id}>
            <a
              href={`${process.env.REACT_APP_SOCKET_URL}/files/${file.docFile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fileInfo"
            >
              <InsertDriveFile size={24} color="primary" />
              <Box component="strong">{file.fullname}</Box>
            </a>
            <Box component="span">
              há{' '}
              {formatDistance(parseISO(file.created_at), new Date(), {
                locale: ptBR,
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
