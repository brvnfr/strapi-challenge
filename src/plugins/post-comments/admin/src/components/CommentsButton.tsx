import React, { useEffect, useState } from 'react';
import { Button, Dialog, Loader } from '@strapi/design-system';
import CommentList from './CommentList';
import { Eye } from '@strapi/icons';
import axios from 'axios';

// https://docs.strapi.io/dev-docs/migration/v4-to-v5/additional-resources/helper-plugin
// reference to deprecated useCMEditViewDataManager alternative
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: { username: string };
}

const CommentsButton: React.FC = () => {
  const data = useContentManagerContext();

  const isPostPage = data?.contentType?.apiID === 'post';

  const [comments, setComments] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchComments = async (page = 1) => {
    try {
      setLoading(true);

      const response = await axios.get(`/api/post-comments/comments`, {
        params: {
          postId: data.id,
          page,
          pageSize: 5,
        },
      });

      setComments(response.data.comments);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.id && isPostPage) {
      fetchComments();
    }
  }, [data.id, isPostPage]);

  return (
    isPostPage && data.id && (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="default" fullWidth startIcon={<Eye />}>
            Ver Comentários
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Header>Comentários do Post</Dialog.Header>

          {loading ? (
            <Loader>Carregando comentários...</Loader>
          ) : comments.length === 0 ? (
            <p>Esse post não possui comentários.</p>
          ) : (
            <CommentList comments={comments} pagination={pagination} fetchComments={fetchComments} />
          )}

          <Dialog.Footer>
            <Dialog.Cancel>
              <Button fullWidth variant="tertiary">
                Fechar
              </Button>
            </Dialog.Cancel>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    )
  );
};

export default CommentsButton;
