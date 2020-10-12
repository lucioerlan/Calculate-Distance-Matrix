import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { formatDistance, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale'
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';

import api from '../../service/api';

export default () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:7400');
    async function getPost() {
      try {
        const response = await api.get('/get-files');
        setPost(response.data);

        socket.on('post', () => {
          getPost();
        });

      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  }, []);

  return (
      <div id="file-container">
        <ul>
          {posts.map(file => (
            <li key={file.id}>
              <a
                href={`http://localhost:7400/files/${file.fileName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fileInfo"
              >
                <InsertDriveFile size={24} color="primary" />
                <strong>{file.fullname}</strong>
              </a>
              <span>
              there is{' '} 
                {formatDistance(parseISO(file.created_at), new Date(), {
                  locale: enUS,
                })}
              </span>
            </li>
          ))}
        </ul>
      </div>
  );
};
