import React from 'react';
import { Box, Typography, Button } from '@strapi/design-system';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    firstname?: string;
    lastname?: string;
  } | null;
}

interface CommentListProps {
  comments: Comment[];
  pagination: { page: number; pageSize: number; total: number };
  fetchComments: (page: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, pagination, fetchComments }) => {
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  return (
    <Box padding={3} background="neutral100" shadow="filterShadow" borderRadius="medium">
      {comments.map((comment, index) => (
        console.log("comment",comment),
        <Box
          key={comment.id}
          marginBottom={index === comments.length - 1 ? 0 : 4}
          padding={3}
          borderRadius="8px"
          background="neutral100"
          border="1px solid #ccc"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
            <Typography fontWeight="bold" fontSize="lg">
              {comment.user ? `${comment.user.firstname || ''} ${comment.user.lastname || ''}`.trim() : 'Anônimo'}
            </Typography>
            <Typography variant="pi" marginLeft={2} style={{ color: 'gray' }}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography style={{ fontSize: '16px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
            {comment.content}
          </Typography>
        </Box>
      ))}

      {/* Paginação Numerada */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" marginTop={4}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={pagination.page === i + 1 ? 'default' : 'tertiary'}
              onClick={() => fetchComments(i + 1)}
              style={{
                margin: '0 4px',
                minWidth: '35px',
                padding: '6px 10px',
              }}
            >
              {i + 1}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CommentList;
